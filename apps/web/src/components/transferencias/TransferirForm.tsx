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

  const handleTransfer = async (
    senderUsername: string,
    recipientClabe: string,
    amount: number,
    commission: number
  ) => {
    const client = generateClient<Schema>();
    
    try {
      // 1. Validate sender has sufficient funds
      const sender = await client.models.User.get({
        id: senderUsername
      }, { 
        authMode: 'userPool',
        selectionSet: ['id', 'balance']
      });

      if (!sender.data || sender.data.balance! < (amount + commission)) {
        throw new Error('Insufficient funds');
      }

      // 2. Validate recipient exists - Using clabe field instead of id
      const recipients = await client.models.User.list({
        filter: { 
          clabe: { 
            eq: recipientClabe 
          }
        },
        authMode: 'apiKey',
        selectionSet: ['id', 'clabe', 'balance']
      });

      console.log('Found recipients:', recipients); // Debug log

      if (!recipients.data || recipients.data.length === 0) {
        throw new Error('Recipient not found');
      }

      const recipient = recipients.data[0];
      // 3. Perform the transfer
      const newSenderBalance = sender.data.balance! - (amount + commission);
      const newRecipientBalance = (recipient.balance || 0) + amount;

      // Update sender balance
      await client.models.User.update({
        id: senderUsername,
        balance: newSenderBalance
      }, { 
        authMode: 'userPool',
        selectionSet: ['id', 'balance']
      });

      // Update recipient balance - Use recipient's id from the query
      await client.models.User.update({
        id: recipient.id,
        balance: newRecipientBalance
      }, {
        authMode: 'apiKey',
        selectionSet: ['id', 'balance']
      });

      // Create movement records for both parties
      const trackingId = `TRX-${Date.now()}`;
      
      await Promise.all([
        // Sender outbound movement
        client.models.Movement.create({
          userId: senderUsername,
          category: 'WIRE',
          direction: 'OUTBOUND',
          status: 'COMPLETED',
          amount,
          commission,
          finalAmount: amount + commission,
          trackingId,
          counterpartyClabe: recipientClabe,
          counterpartyName: recipient.id, // Add recipient's name if available
          counterpartyBank: 'CEDI',
          createdAt: new Date().toISOString(),
        }, { authMode: 'userPool' }),

        // Recipient inbound movement
        client.models.Movement.create({
          userId: recipient.id,
          category: 'WIRE',
          direction: 'INBOUND',
          status: 'COMPLETED',
          amount,
          commission: 0,
          finalAmount: amount,
          trackingId,
          counterpartyClabe: senderUsername, // Remove sender.data.clabe since it doesn't exist
          counterpartyName: senderUsername, // Add sender's name if available
          counterpartyBank: 'CEDI',
          createdAt: new Date().toISOString(),
        }, { authMode: 'apiKey' })
      ]);

      return {
        success: true,
        newSenderBalance,
        newRecipientBalance
      };

    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const amount = parseFloat(formData.get('amount') as string);
      const destinationClabe = formData.get('clabe') as string;
      
      const currentUser = await getCurrentUser();
      if (!currentUser?.username) {
        throw new Error('No user authenticated');
      }

      const result = await handleTransfer(
        currentUser.username,
        destinationClabe,
        amount,
        COMMISSION_AMOUNT
      );

      setUserBalance(result.newSenderBalance);
      toast.success("Transferencia completada correctamente");
      e.currentTarget.reset();

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al realizar la transferencia");
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