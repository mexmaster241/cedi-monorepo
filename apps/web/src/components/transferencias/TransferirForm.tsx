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
import { Trash2 } from "lucide-react"

interface Contact {
  id: string
  value: string
  name: string
  alias?: string
}

const COMMISSION_AMOUNT = 5.80;
const COMMISSION_CLABE = '646180527800000009';

interface Bank {
  code: string;
  name: string;
}

const BANK_CODES: { [key: string]: Bank } = {
  "002": { code: "002", name: "BANAMEX" },
  "006": { code: "006", name: "BANCOMEXT" },
  "009": { code: "009", name: "BANOBRAS" },
  "012": { code: "012", name: "BBVA MEXICO" },
  "014": { code: "014", name: "SANTANDER" },
  "019": { code: "019", name: "BANJERCITO" },
  "021": { code: "021", name: "HSBC" },
  "030": { code: "030", name: "BAJÍO" },
  "036": { code: "036", name: "INBURSA" },
  "042": { code: "042", name: "MIFEL" },
  "044": { code: "044", name: "SCOTIABANK" },
  "058": { code: "058", name: "BANREGIO" },
  "059": { code: "059", name: "INVEX" },
  "060": { code: "060", name: "BANSI" },
  "062": { code: "062", name: "AFIRME" },
  "072": { code: "072", name: "BANORTE" },
  "106": { code: "106", name: "BANK OF AMERICA" },
  "108": { code: "108", name: "MUFG" },
  "110": { code: "110", name: "JP MORGAN" },
  "112": { code: "112", name: "BMONEX" },
  "113": { code: "113", name: "VE POR MAS" },
  "126": { code: "126", name: "CREDIT SUISSE" },
  "127": { code: "127", name: "AZTECA" },
  "128": { code: "128", name: "AUTOFIN" },
  "129": { code: "129", name: "BARCLAYS" },
  "130": { code: "130", name: "COMPARTAMOS" },
  "132": { code: "132", name: "MULTIVA BANCO" },
  "133": { code: "133", name: "ACTINVER" },
  "135": { code: "135", name: "NAFIN" },
  "136": { code: "136", name: "INTERCAM BANCO" },
  "137": { code: "137", name: "BANCOPPEL" },
  "138": { code: "138", name: "ABC CAPITAL" },
  "140": { code: "140", name: "CONSUBANCO" },
  "141": { code: "141", name: "VOLKSWAGEN" },
  "143": { code: "143", name: "CIBanco" },
  "145": { code: "145", name: "BBASE" },
  "147": { code: "147", name: "BANKAOOL" },
  "148": { code: "148", name: "PagaTodo" },
  "150": { code: "150", name: "INMOBILIARIO" },
  "151": { code: "151", name: "Donde" },
  "152": { code: "152", name: "BANCREA" },
  "154": { code: "154", name: "BANCO COVALTO" },
  "155": { code: "155", name: "ICBC" },
  "156": { code: "156", name: "SABADELL" },
  "157": { code: "157", name: "SHINHAN" },
  "158": { code: "158", name: "MIZUHO BANK" },
  "159": { code: "159", name: "BANK OF CHINA" },
  "160": { code: "160", name: "BANCO S3" },
  "166": { code: "166", name: "Banco del Bienestar" },
  "168": { code: "168", name: "HIPOTECARIA FEDERAL" },
  "600": { code: "600", name: "MONEXCB" },
  "601": { code: "601", name: "GBM" },
  "602": { code: "602", name: "MASARI CB" },
  "605": { code: "605", name: "VALUÉ" },
  "608": { code: "608", name: "VECTOR" },
  "610": { code: "610", name: "B&B" },
  "613": { code: "613", name: "MULTIVA CBOLSA" },
  "616": { code: "616", name: "FINAMEX" },
  "617": { code: "617", name: "VALMEX" },
  "618": { code: "618", name: "ÚNICA" },
  "619": { code: "619", name: "MAPFRE" },
  "620": { code: "620", name: "PROFUTURO" },
  "621": { code: "621", name: "CB ACTINBER" },
  "622": { code: "622", name: "OACTIN" },
  "623": { code: "623", name: "SKANDIA" },
  "626": { code: "626", name: "CBDEUTSCHE" },
  "627": { code: "627", name: "ZURICH" },
  "628": { code: "628", name: "ZURICHVI" },
  "629": { code: "629", name: "SU CASITA" },
  "630": { code: "630", name: "C.B. INTERCAM" },
  "631": { code: "631", name: "C.I. BOLSA" },
  "632": { code: "632", name: "BULLTICK C.B." },
  "633": { code: "633", name: "STERLING" },
  "634": { code: "634", name: "FINCOMUN" },
  "636": { code: "636", name: "HDI SEGUROS" },
  "637": { code: "637", name: "ORDER" },
  "638": { code: "638", name: "AKALA" },
  "640": { code: "640", name: "C.B. JP MORGAN" },
  "642": { code: "642", name: "REFORMA" },
  "646": { code: "646", name: "STP" },
  "647": { code: "647", name: "TELECOMM" },
  "648": { code: "648", name: "EVERCORE" },
  "649": { code: "649", name: "SKANDIA" },
  "651": { code: "651", name: "SEGMTY" },
  "652": { code: "652", name: "ASEA" },
  "653": { code: "653", name: "KUSPIT" },
  "655": { code: "655", name: "SOFIEXPRESS" },
  "656": { code: "656", name: "UNAGRA" },
  "659": { code: "659", name: "OPCIONES EMPRESARIALES DEL NOROESTE" },
  "670": { code: "670", name: "LIBERTAD" },
  "674": { code: "674", name: "AXA" },
  "677": { code: "677", name: "CAJA POP MEXICA" },
  "679": { code: "679", name: "FND" },
  "684": { code: "684", name: "TRANSFER" },
  "722": { code: "722", name: "MERCADO PAGO" },
  "901": { code: "901", name: "CLS" },
  "902": { code: "902", name: "INDEVAL" },
  "999": { code: "999", name: "N/A" }
};

const BANK_TO_INSTITUTION: { [key: string]: string } = {
  "002": "40002", // BANAMEX
  "006": "37006", // BANCOMEXT
  "009": "37009", // BANOBRAS
  "012": "40012", // BBVA MEXICO
  "014": "40014", // SANTANDER
  "019": "37019", // BANJERCITO
  "021": "40021", // HSBC
  "030": "40030", // BAJIO
  "036": "40036", // INBURSA
  "042": "40042", // MIFEL
  "044": "40044", // SCOTIABANK
  "058": "40058", // BANREGIO
  "059": "40059", // INVEX
  "060": "40060", // BANSI
  "062": "40062", // AFIRME
  "072": "40072", // BANORTE
  "106": "40106", // BANK OF AMERICA
  "108": "40108", // MUFG
  "110": "40110", // JP MORGAN
  "112": "40112", // BMONEX
  "113": "40113", // VE POR MAS
  "124": "40124", // CBM BANCO
  "127": "40127", // AZTECA
  "128": "40128", // AUTOFIN
  "129": "40129", // BARCLAYS
  "130": "40130", // COMPARTAMOS
  "132": "40132", // MULTIVA BANCO
  "133": "40133", // ACTINVER
  "135": "37135", // NAFIN
  "136": "40136", // INTERCAM BANCO
  "137": "40137", // BANCOPPEL
  "138": "40138", // ABC CAPITAL
  "140": "40140", // CONSUBANCO
  "141": "40141", // VOLKSWAGEN
  "143": "40143", // CIBANCO
  "145": "40145", // BBASE
  "147": "40147", // BANKAOOL
  "148": "40148", // PAGATODO
  "150": "40150", // INMOBILIARIO
  "151": "40151", // DONDE
  "152": "40152", // BANCREA
  "154": "40154", // BANCO COVALTO
  "155": "40155", // ICBC
  "156": "40156", // SABADELL
  "157": "40157", // SHINHAN
  "158": "40158", // MIZUHO BANK
  "159": "40159", // BANK OF CHINA
  "160": "40160", // BANCO S3
  "166": "37166", // BaBien
  "168": "37168", // HIPOTECARIA FED
  "600": "90600", // MONEXCB
  "601": "90601", // GBM
  "602": "90602", // MASARI
  "605": "90605", // VALUE
  "608": "90608", // VECTOR
  "616": "90616", // FINAMEX
  "617": "90617", // VALMEX
  "620": "90620", // PROFUTURO
  "630": "90630", // CB INTERCAM
  "631": "90631", // CI BOLSA
  "634": "90634", // FINCOMUN
  "638": "90638", // NU MEXICO
  "642": "90642", // REFORMA
  "646": "90646", // STP
  "652": "90652", // CREDICAPITAL
  "653": "90653", // KUSPIT
  "656": "90656", // UNAGRA
  "659": "90659", // ASP INTEGRA OPC
  "661": "90661", // ALTERNATIVOS
  "670": "90670", // LIBERTAD
  "677": "90677", // CAJA POP MEXICA
  "680": "90680", // CRISTOBAL COLON
  "683": "90683", // CAJA TELEFONIST
  "684": "90684", // TRANSFER
  "685": "90685", // FONDO (FIRA)
  "686": "90686", // INVERCAP
  "689": "90689", // FOMPED
  "699": "90699", // FONDEADORA
  "703": "90703", // TESORED
  "706": "90706", // ARCUS
  "710": "90710", // NVIO
  "722": "90722", // Mercado Pago W
  "723": "90723", // CUENCA
  "728": "90728", // SPIN BY OXXO
  "902": "90902", // INDEVAL
  "903": "90903", // CoDi Valida
};

// Special cases for secondary institutions
const SECONDARY_INSTITUTIONS: { [key: string]: string } = {
  "002": "91802", // BANAMEX2
  "012": "91812", // BBVA BANCOMER2
  "014": "91814", // SANTANDER2
  "021": "91821", // HSBC2
  "072": "91872", // BANORTE2
  "127": "91927", // AZTECA2
};

export function TransferirForm() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('clabe')
  const [loading, setLoading] = useState(false)
  const [userBalance, setUserBalance] = useState(0);
  const client = generateClient<Schema>();
  const { toast } = useToast();
  const [detectedBank, setDetectedBank] = useState<Bank | null>(null);
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
          name: contact.name,
          alias: contact.alias || contact.name
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

      const sender = senderDetails.data;
      const recipient = recipients.data?.[0];
      const recipientBankCode = recipientClabe.substring(0, 3);
      const senderFullName = `${sender.givenName} ${sender.familyName}`;

      // Get beneficiary name from the form
      const beneficiaryNameInput = document.getElementById('beneficiaryName') as HTMLInputElement;
      const recipientName = beneficiaryNameInput?.value || 'Unknown Recipient';

      // Prepare the outbound payload
      const outboundPayload = prepareOutboundPayload(
        sender.clabe!,
        recipientClabe,
        amount,
        concept,
        senderFullName,
        recipientName,
        recipientBankCode
      );

      // Debug logging
      console.log('🚀 Outbound Transfer Payload:', {
        payload: outboundPayload,
        bankCode: recipientBankCode,
        institutionCode: getInstitutionCode(recipientBankCode),
        bankName: BANK_CODES[recipientBankCode]?.name
      });

      // 2. Find commission account
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

      // 3. Update balances
      await Promise.all([
        // Update sender's balance
        client.models.User.update({
          id: senderUsername,
          balance: sender.balance! - (amount + commission)
        }, { 
          authMode: 'userPool',
          selectionSet: ['id', 'balance']
        }),

        // If recipient is in our system, update their balance
        ...(recipient ? [
          client.models.User.update({
            id: recipient.id,
            balance: (recipient.balance || 0) + amount
          }, {
            authMode: 'apiKey',
            selectionSet: ['id', 'balance']
          })
        ] : []),

        // Update commission account balance
        client.models.User.update({
          id: commissionRecipient.id,
          balance: (commissionRecipient.balance || 0) + commission
        }, {
          authMode: 'apiKey',
          selectionSet: ['id', 'balance']
        })
      ]);

      // 4. Create movement records
      const claveRastreo = outboundPayload.claveRastreo;
      
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
          claveRastreo,
          counterpartyClabe: recipientClabe,
          counterpartyName: recipientName,
          counterpartyBank: BANK_CODES[recipientBankCode]?.name || 'Unknown Bank',
          concept,
          metadata: JSON.stringify(outboundPayload),
          createdAt: new Date().toISOString(),
        }, { authMode: 'userPool' }),

        // If recipient is in our system, create their movement record
        ...(recipient ? [
          client.models.Movement.create({
            userId: recipient.id,
            category: 'WIRE',
            direction: 'INBOUND',
            status: 'COMPLETED',
            amount,
            commission: 0,
            finalAmount: amount,
            claveRastreo,
            counterpartyClabe: sender.clabe || senderUsername,
            counterpartyName: senderFullName,
            counterpartyBank: 'CEDI',
            concept,
            concept2,
            metadata: JSON.stringify(outboundPayload),
            createdAt: new Date().toISOString(),
          }, { authMode: 'apiKey' })
        ] : []),

        // Commission movement record
        client.models.Movement.create({
          userId: commissionRecipient.id,
          category: 'COMMISSION',
          direction: 'INBOUND',
          status: 'COMPLETED',
          amount: commission,
          commission: 0,
          finalAmount: commission,
          claveRastreo,
          counterpartyClabe: sender.clabe || senderUsername,
          counterpartyName: senderFullName,
          counterpartyBank: 'CEDI',
          concept: 'Comisión por transferencia',
          metadata: JSON.stringify(outboundPayload),
          createdAt: new Date().toISOString(),
        }, { authMode: 'apiKey' })
      ]);

      return {
        success: true,
        newSenderBalance: sender.balance! - (amount + commission),
        debugPayload: outboundPayload
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
        try {
          const bankCode = institution || detectedBank?.code || 'unknown';
          const bankName = BANK_CODES[bankCode]?.name || 'Desconocido';
          const alias = formData.get('contactAlias') as string;

          console.log('Saving contact with data:', {
            userId: currentUser.username,
            clabe: destinationClabe,
            name: beneficiaryName,
            alias: alias || beneficiaryName,
            bank: bankName
          });

          const newContact = await client.models.Contact.create({
            userId: currentUser.username,
            clabe: destinationClabe,
            name: beneficiaryName,
            alias: alias || beneficiaryName,
            bank: bankName
          }, { 
            authMode: 'userPool',
            selectionSet: ['id', 'clabe', 'name', 'alias', 'bank']
          });

          console.log('Contact creation response:', newContact);
          if (newContact.data) {
            setContacts(prevContacts => [...prevContacts, {
              id: newContact.data!.id,
              value: newContact.data!.clabe,
              name: newContact.data!.name,
              alias: newContact.data!.alias || undefined
            }]);
          }
        } catch (error) {
          console.error('Failed to create contact:', error);
          toast({
            variant: "destructive",
            title: "Error al guardar el contacto",
            description: "No se pudo guardar el contacto",
          });
        }
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

    // Find and update the beneficiary name input with the actual name
    const nameInput = document.getElementById('beneficiaryName') as HTMLInputElement;
    if (nameInput) {
      nameInput.value = contact.name;
    }

    // Trigger CLABE validation if needed
    handleClabeChange({ target: { value: contact.value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleClabeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clabe = e.target.value;
    if (clabe.length >= 3) {
      const bankCode = clabe.substring(0, 3);
      const bank = BANK_CODES[bankCode];
      setDetectedBank(bank || null);
      
      // Automatically set the institution in the select
      const institutionSelect = document.querySelector('select[name="institution"]') as HTMLSelectElement;
      if (institutionSelect && bank) {
        institutionSelect.value = bank.code;
      }
    } else {
      setDetectedBank(null);
    }
  };

  const getInstitutionCode = (bankCode: string) => {
    // First try the primary institution code
    const primaryCode = BANK_TO_INSTITUTION[bankCode];
    if (primaryCode) return primaryCode;
    
    // Then check secondary institutions
    const secondaryCode = SECONDARY_INSTITUTIONS[bankCode];
    if (secondaryCode) return secondaryCode;
    
    // Default to STP if no matching institution is found
    return "90646";
  };

  const prepareOutboundPayload = (
    senderClabe: string,
    recipientClabe: string,
    amount: number,
    concept: string,
    senderName: string,
    recipientName: string,
    bankCode: string,
  ) => {
    return {
      claveRastreo: `CEDI${Math.floor(10000000 + Math.random() * 90000000)}`,
      conceptoPago: concept,
      cuentaOrdenante: senderClabe,
      cuentaBeneficiario: recipientClabe,
      empresa: "CEDI",
      institucionContraparte: getInstitutionCode(bankCode),
      institucionOperante: "90646",
      monto: amount.toFixed(2),
      nombreBeneficiario: recipientName,
      nombreOrdenante: senderName,
      referenciaNumerica: Math.floor(100000 + Math.random() * 900000).toString(),
      rfcCurpBeneficiario: "ND",
      rfcCurpOrdenante: "ND",
      tipoCuentaBeneficiario: "40",
      tipoCuentaOrdenante: "40",
      tipoPago: "1"
    };
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await client.models.Contact.delete({
        id: contactId
      }, { 
        authMode: 'userPool' 
      });

      // Update local state to remove the deleted contact
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
      
      toast({
        title: "Contacto eliminado",
        description: "El contacto ha sido eliminado correctamente",
      });
    } catch (error) {
      console.error('Failed to delete contact:', error);
      toast({
        variant: "destructive",
        title: "Error al eliminar el contacto",
        description: "No se pudo eliminar el contacto",
      });
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
                    className="p-3 hover:bg-accent"
                  >
                    <div className="flex justify-between items-center">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="space-y-1">
                          <p className="font-medium font-clash-display">
                            {contact.alias || contact.name}
                          </p>
                          <p className="text-sm text-muted-foreground font-clash-display">
                            {contact.value}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteContact(contact.id);
                        }}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      onChange={handleClabeChange}
                    />
                    {detectedBank && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Banco detectado: {detectedBank.name}
                      </p>
                    )}
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
              <Select name="institution" disabled={!!detectedBank}>
                <SelectTrigger>
                  <SelectValue className="font-clash-display" placeholder={detectedBank ? detectedBank.name : "Seleccionar banco"} />
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

          

            {/* Save Account Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="saveAccount" 
                name="saveAccount" 
                onCheckedChange={(checked) => {
                  // Find the alias input container and toggle its visibility
                  const aliasContainer = document.getElementById('aliasContainer');
                  if (aliasContainer) {
                    aliasContainer.style.display = checked ? 'block' : 'none';
                  }
                }}
              />
              <Label 
                htmlFor="saveAccount" 
                className="text-sm font-clash-display leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Guardar cuenta
              </Label>
            </div>

            {/* Alias input - hidden by default */}
            <div id="aliasContainer" className="hidden">
              <Label className="font-clash-display" htmlFor="contactAlias">Alias para el contacto</Label>
              <Input 
                className="font-clash-display"
                id="contactAlias" 
                name="contactAlias"
                placeholder="Ej: Mamá, Trabajo, etc." 
              />
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