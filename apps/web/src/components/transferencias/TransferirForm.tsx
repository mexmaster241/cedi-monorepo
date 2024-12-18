"use client"
import { useState, useEffect } from "react"
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import { type Schema } from 'config/amplify/data/resource'
import { useToast } from "@/hooks/use-toast"
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
  value: string
  name: string
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
  const { toast } = useToast();
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

  useEffect(() => {
    async function fetchContacts() {
      try {
        const { username } = await getCurrentUser();
        const result = await client.models.Contact.list({
          filter: { userId: { eq: username }},
          authMode: 'userPool'
        });
        
        setContacts(result.data?.map(contact => ({
          id: contact.id,
          value: contact.clabe,
          name: contact.name
        })) || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    }
    fetchContacts();
  }, []);

  const handleTransfer = async (
    senderUsername: string,
    recipientClabe: string,
    amount: number,
    commission: number,
    concept: string,
    concept2: string
  ) => {
    const client = generateClient<Schema>();
    
    try {
      // 1. Get sender's full details using apiKey to ensure consistent access
      const [senderDetails, recipients] = await Promise.all([
        client.models.User.get({
          id: senderUsername
        }, { 
          authMode: 'apiKey',
          selectionSet: ['id', 'clabe', 'balance', 'givenName', 'familyName']
        }),
        client.models.User.list({
          filter: { clabe: { eq: recipientClabe }},
          authMode: 'apiKey',
          selectionSet: ['id', 'clabe', 'balance', 'givenName', 'familyName']
        })
      ]);

      if (!senderDetails.data || senderDetails.data.balance! < (amount + commission)) {
        throw new Error('Insufficient funds');
      }

      if (!recipients.data?.length) {
        throw new Error('Recipient not found');
      }

      const sender = senderDetails.data;
      const recipient = recipients.data[0];

      // Create full names
      const senderFullName = `${sender.givenName} ${sender.familyName}`;
      const recipientFullName = `${recipient.givenName} ${recipient.familyName}`;

      // 2. Find both recipient and commission account with full details
      const [commissionAccount] = await Promise.all([
        client.models.User.list({
          filter: { clabe: { eq: COMMISSION_CLABE }},
          authMode: 'apiKey',
          selectionSet: ['id', 'clabe', 'balance']
        })
      ]);

      if (!commissionAccount.data?.length) {
        throw new Error('Commission account not found');
      }

      const commissionRecipient = commissionAccount.data[0];

      // 3. Update balances (unchanged)
      await Promise.all([
        client.models.User.update({
          id: senderUsername,
          balance: sender.balance! - (amount + commission)
        }, { 
          authMode: 'userPool',
          selectionSet: ['id', 'balance']
        }),

        client.models.User.update({
          id: recipient.id,
          balance: (recipient.balance || 0) + amount
        }, {
          authMode: 'apiKey',
          selectionSet: ['id', 'balance']
        }),

        client.models.User.update({
          id: commissionRecipient.id,
          balance: (commissionRecipient.balance || 0) + commission
        }, {
          authMode: 'apiKey',
          selectionSet: ['id', 'balance']
        })
      ]);

      // 4. Create movement records with proper names
      const trackingId = `CEDI${Date.now()}`;
      
      await Promise.all([
        // Sender's movement record
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
          counterpartyName: recipientFullName,
          counterpartyBank: 'CEDI',
          concept,
          createdAt: new Date().toISOString(),
        }, { authMode: 'userPool' }),

        // Recipient's movement record
        client.models.Movement.create({
          userId: recipient.id,
          category: 'WIRE',
          direction: 'INBOUND',
          status: 'COMPLETED',
          amount,
          commission: 0,
          finalAmount: amount,
          trackingId,
          counterpartyClabe: sender.clabe || senderUsername,
          counterpartyName: senderFullName,
          counterpartyBank: 'CEDI',
          concept,
          concept2,
          createdAt: new Date().toISOString(),
        }, { authMode: 'apiKey' })
      ]);

      return {
        success: true,
        newSenderBalance: sender.balance! - (amount + commission),
        newRecipientBalance: (recipient.balance || 0) + amount
      };

    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const amount = parseFloat(formData.get('amount') as string);
      const destinationClabe = formData.get('clabe') as string;
      const saveAccount = formData.get('saveAccount') === 'on';
      const beneficiaryName = formData.get('beneficiaryName') as string;
      const institution = formData.get('institution') as string;
      const concept = formData.get('concept') as string;
      const concept2 = formData.get('concept2') as string;
      
      const currentUser = await getCurrentUser();
      if (!currentUser?.username) {
        throw new Error('No user authenticated');
      }

      if (saveAccount) {
        await client.models.Contact.create({
          userId: currentUser.username,
          clabe: destinationClabe,
          name: beneficiaryName,
          bank: institution
        }, { 
          authMode: 'userPool' 
        });

        const result = await client.models.Contact.list({
          filter: { userId: { eq: currentUser.username }},
          authMode: 'userPool'
        });
        setContacts(result.data?.map(contact => ({
          id: contact.id,
          value: contact.clabe,
          name: contact.name,
          bank: contact.bank
        })) || []);
      }

      const result = await handleTransfer(
        currentUser.username,
        destinationClabe,
        amount,
        COMMISSION_AMOUNT,
        concept,
        concept2
      );

      if (result.success) {
        setUserBalance(result.newSenderBalance);
        toast({
          title: "Transferencia completada correctamente",
          description: "La transferencia se ha realizado correctamente",
        });
        
        // Reset form and total amount field
        form.reset();
        const totalAmountInput = document.getElementById('totalAmount') as HTMLInputElement;
        if (totalAmountInput) {
          totalAmountInput.value = '';
        }
      }

    } catch (error) {
      console.error('Submit error:', error);
      toast({
        variant: "destructive",
        title: "Error al realizar la transferencia",
        description: error instanceof Error ? error.message : "Error al realizar la transferencia",
      });
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

  const handleContactSelect = (contact: Contact) => {
    // Find and update the CLABE input
    const clabeInput = document.getElementById('clabe') as HTMLInputElement;
    if (clabeInput) {
      clabeInput.value = contact.value;
    }

    // Find and update the beneficiary name input
    const nameInput = document.getElementById('beneficiaryName') as HTMLInputElement;
    if (nameInput) {
      nameInput.value = contact.name;
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
                  <Card 
                    key={contact.id} 
                    className="p-3 cursor-pointer hover:bg-accent"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="space-y-1">
                      <p className="font-medium font-clash-display">{contact.name}</p>
                      <p className="text-sm text-muted-foreground font-clash-display">
                        {contact.value}
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
                  <SelectItem className="font-clash-display" value="
                  ">BBVA</SelectItem>
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