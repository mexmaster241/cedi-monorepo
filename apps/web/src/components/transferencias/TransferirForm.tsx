"use client"
import { useState, useEffect } from "react"
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import { type Schema } from 'config/amplify/data/resource'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface Contact {
  id: string
  type: 'clabe' | 'tarjeta' | 'celular'
  value: string
  name: string
  bank: string
}

const COMMISSION_AMOUNT = 5.80;
const COMMISSION_CLABE = '646180527800000009';

export function TransferirForm() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('clabe')
  const [loading, setLoading] = useState(false)
  const [userBalance, setUserBalance] = useState(0);
  const client = generateClient<Schema>();

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.value.includes(searchQuery)
    )
  })

  useEffect(() => {
    async function fetchBalance() {
      try {
        const { username } = await getCurrentUser();
        const userResult = await client.models.User.get({ 
          id: username,
        }, {
          authMode: 'userPool',
          selectionSet: ['id', 'balance']
        });
        
        setUserBalance(userResult.data?.balance ?? 0);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }
    fetchBalance();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);

    try {
      const formData = new FormData(form);
      const amount = parseFloat(formData.get('amount') as string);
      const destinationClabe = formData.get('clabe') as string;

      console.log('Starting transfer to:', destinationClabe, 'amount:', amount);

      const totalAmount = amount + COMMISSION_AMOUNT;

      if (totalAmount > userBalance) {
        toast.error("Saldo insuficiente para realizar la transferencia");
        return;
      }

      const currentUser = await getCurrentUser();
      if (!currentUser?.username) {
        throw new Error('No user authenticated');
      }

      // Create outbound movement for sender
      const senderMovement = await client.models.Movement.create({
        userId: currentUser.username,
        category: 'WIRE',
        direction: 'OUTBOUND',
        status: 'COMPLETED', // Mark as completed for internal transfers
        amount: amount,
        commission: COMMISSION_AMOUNT,
        finalAmount: totalAmount,
        trackingId: `TRX-${Date.now()}`,
        counterpartyName: formData.get('beneficiaryName') as string,
        counterpartyBank: 'CEDI',
        counterpartyClabe: destinationClabe,
        concept: formData.get('concept') as string,
        internalReference: formData.get('reference') as string,
        metadata: JSON.stringify({
          commissionClabe: COMMISSION_CLABE,
          originalAmount: amount
        }),
        createdAt: new Date().toISOString(),
      }, { authMode: 'userPool' });

      // Update sender's balance (subtract total amount)
      const newSenderBalance = userBalance - totalAmount;
      await client.models.User.update({
        id: currentUser.username,
        balance: newSenderBalance
      }, { 
        authMode: 'userPool',
        selectionSet: ['id', 'balance']
      });

      // Then find and update recipient's balance
      console.log('Searching for CLABE:', destinationClabe);
      const recipientUsers = await client.models.User.list({
        filter: {
          id: {
            eq: destinationClabe
          }
        },
        selectionSet: ['id', 'balance'],
        authMode: 'apiKey'
      });

      console.log('Recipient users:', recipientUsers);

      if (recipientUsers.data && recipientUsers.data.length > 0) {
        const recipientUser = recipientUsers.data[0];
        const newRecipientBalance = (recipientUser.balance || 0) + amount;
        await client.models.User.update({
          id: destinationClabe,
          balance: newRecipientBalance
        }, {
          authMode: 'apiKey',
          selectionSet: ['id', 'balance']
        });
      }

      // Update commission account balance
      const commissionUser = await client.models.User.get({
        id: COMMISSION_CLABE
      }, { authMode: 'userPool' });

      if (commissionUser.data) {
        const newCommissionBalance = (commissionUser.data.balance || 0) + COMMISSION_AMOUNT;
        await client.models.User.update({
          id: COMMISSION_CLABE,
          balance: newCommissionBalance
        }, { authMode: 'userPool' });

        // Create inbound movement for commission
        await client.models.Movement.create({
          userId: COMMISSION_CLABE,
          category: 'INTERNAL',
          direction: 'INBOUND',
          status: 'COMPLETED',
          amount: COMMISSION_AMOUNT,
          commission: 0,
          finalAmount: COMMISSION_AMOUNT,
          trackingId: `COM-${Date.now()}`,
          counterpartyName: `${currentUser.username}`,
          counterpartyBank: 'CEDI',
          counterpartyClabe: currentUser.username,
          concept: 'Comisión por transferencia',
          createdAt: new Date().toISOString(),
        }, { authMode: 'userPool' });
      }

      toast.success("Transferencia completada correctamente", {
        description: `Monto: $${amount.toFixed(2)}\nComisión: $${COMMISSION_AMOUNT.toFixed(2)}\nTotal: $${totalAmount.toFixed(2)}`,
        duration: 5000,
      });
      
      form.reset();
      setUserBalance(newSenderBalance);
      
      const totalAmountInput = document.getElementById('totalAmount') as HTMLInputElement;
      if (totalAmountInput) {
        totalAmountInput.value = '0.00';
      }

    } catch (error) {
      console.error('Transfer error:', error);
      toast.error("Error al realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value || '0');
    const totalAmount = amount + COMMISSION_AMOUNT;
    
    const totalAmountInput = document.getElementById('totalAmount') as HTMLInputElement;
    if (totalAmountInput) {
      totalAmountInput.value = totalAmount.toFixed(2);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left side - Contact List */}
      <div className="col-span-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Buscar contacto..." 
                className="w-full font-clash-display"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-[400px] overflow-y-auto space-y-2">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <Card key={contact.id} className="p-3 cursor-pointer hover:bg-accent">
                    <div className="space-y-1">
                      <p className="font-medium font-clash-display">{contact.name}</p>
                      <p className="text-sm text-muted-foreground font-clash-display">
                        {contact.type.toUpperCase()}: {contact.value}
                      </p>
                      <p className="text-sm text-muted-foreground font-clash-display">
                        {contact.bank}
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground font-clash-display">
                  No hay contactos guardados
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Right side - Transfer Form */}
      <div className="col-span-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs 
              defaultValue="clabe" 
              className="w-full"
              onValueChange={(value) => setSelectedTab(value as 'clabe' | 'tarjeta' | 'celular')}
            >
              <TabsList>
                <TabsTrigger className="font-clash-display" value="clabe">CLABE</TabsTrigger>
                <TabsTrigger className="font-clash-display" value="tarjeta">Tarjeta</TabsTrigger>
                <TabsTrigger className="font-clash-display" value="celular">Celular</TabsTrigger>
              </TabsList>

              <TabsContent value="clabe">
                <div className="space-y-4">
                  <div>
                    <Label className="font-clash-display" htmlFor="clabe">CLABE</Label>
                    <Input 
                      className="font-clash-display" 
                      name="clabe" 
                      id="clabe" 
                      placeholder="18 dígitos" 
                      maxLength={18} 
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tarjeta">
                <div className="space-y-4">
                  <div>
                    <Label className="font-clash-display" htmlFor="tarjeta">Número de Tarjeta</Label>
                    <Input 
                      className="font-clash-display" 
                      name="tarjeta" 
                      id="tarjeta" 
                      placeholder="16 dígitos" 
                      maxLength={16} 
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="celular">
                <div className="space-y-4">
                  <div>
                    <Label className="font-clash-display" htmlFor="celular">Número de Celular</Label>
                    <Input 
                      className="font-clash-display" 
                      name="celular" 
                      id="celular" 
                      placeholder="10 dígitos" 
                      maxLength={10} 
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Institution */}
            <div>
              <Label className="font-clash-display" htmlFor="institution">Institución</Label>
              <Select name="institution">
                <SelectTrigger>
                  <SelectValue className="font-clash-display" placeholder="Seleccionar banco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="font-clash-display" value="banamex">Banamex</SelectItem>
                  <SelectItem className="font-clash-display" value="bancomer">BBVA</SelectItem>
                  <SelectItem className="font-clash-display" value="santander">Santander</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label className="font-clash-display" htmlFor="amount">Monto</Label>
              <Input 
                className="font-clash-display"
                id="amount" 
                name="amount"
                type="number" 
                placeholder="$0.00" 
                min="0"
                step="0.01"
                onChange={handleAmountChange}
              />
            </div>

            {/* Total Amount */}
            <div>
              <Label className="font-clash-display" htmlFor="totalAmount">Monto Total</Label>
              <Input 
                className="font-clash-display"
                id="totalAmount" 
                name="totalAmount"
                type="number" 
                placeholder="$0.00" 
                disabled 
              />
            </div>

            {/* Beneficiary Name */}
            <div>
              <Label className="font-clash-display" htmlFor="beneficiaryName">Nombre del beneficiario</Label>
              <Input 
                className="font-clash-display"
                id="beneficiaryName" 
                name="beneficiaryName"
                placeholder="Nombre completo" 
              />
            </div>

            {/* Payment Concept */}
            <div>
              <Label className="font-clash-display" htmlFor="concept">Concepto del pago</Label>
              <Input 
                className="font-clash-display"
                id="concept" 
                name="concept"
                placeholder="Concepto" 
              />
            </div>

            {/* Optional Second Concept */}
            <div>
              <Label className="font-clash-display" htmlFor="concept2">Concepto 2 (opcional)</Label>
              <Input 
                className="font-clash-display"
                id="concept2" 
                name="concept2"
                placeholder="Concepto adicional" 
              />
            </div>

            {/* Numeric Reference */}
            <div>
              <Label className="font-clash-display" htmlFor="reference">Referencia numérica</Label>
              <Input 
                className="font-clash-display"
                id="reference" 
                name="reference"
                type="number" 
                placeholder="Referencia" 
              />
            </div>

            {/* Save Account Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="saveAccount" name="saveAccount" />
              <Label 
                htmlFor="saveAccount" 
                className="text-sm font-clash-display leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Guardar cuenta
              </Label>
            </div>

            <Button type="submit" className="w-full font-clash-display" disabled={loading}>
              {loading ? "Procesando..." : "Realizar transferencia"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}