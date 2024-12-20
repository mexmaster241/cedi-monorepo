import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/app/constants/colors';
import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource";
import Toast from 'react-native-toast-message';

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

export default function ConfirmDepositScreen() {
  const { 
    amount, 
    recipientId,
    recipientName, 
    accountNumber 
  } = useLocalSearchParams<{
    amount: string;
    recipientId: string;
    recipientName: string;
    accountNumber: string;
  }>();

  const [concept, setConcept] = useState('');
  const [concept2, setConcept2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const client = generateClient<Schema>();

  const getBankFromClabe = (clabe: string) => {
    const bankCode = clabe.substring(0, 3);
    return BANK_TO_INSTITUTION[bankCode];
  };

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
      // 1. Get sender's full details
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

      // Prepare the outbound payload
      const outboundPayload = {
        claveRastreo: `CEDI${Math.floor(10000000 + Math.random() * 90000000)}`,
        conceptoPago: concept,
        cuentaOrdenante: sender.clabe,
        cuentaBeneficiario: recipientClabe,
        empresa: "CEDI",
        institucionContraparte: getInstitutionCode(recipientBankCode),
        institucionOperante: "90646",
        monto: amount.toFixed(2),
        nombreBeneficiario: recipientName,
        nombreOrdenante: senderFullName,
        referenciaNumerica: Math.floor(100000 + Math.random() * 900000).toString(),
        rfcCurpBeneficiario: "ND",
        rfcCurpOrdenante: "ND",
        tipoCuentaBeneficiario: "40",
        tipoCuentaOrdenante: "40",
        tipoPago: "1"
      };

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

      return true;

    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const { username } = await getCurrentUser();

      // Get institution from CLABE
      const institutionId = getBankFromClabe(accountNumber);
      if (!institutionId) {
        throw new Error('Banco no soportado');
      }

      const success = await handleTransfer(
        username,
        accountNumber,
        parseFloat(amount),
        COMMISSION_AMOUNT,
        concept,
        concept2
      );

      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Transferencia completada',
          text2: 'La transferencia se ha realizado correctamente',
          position: 'bottom',
          visibilityTime: 3000,
        });

        router.replace({
          pathname: '/(tabs)/deposit/processing',
          params: {
            movementData: JSON.stringify({
              amount: Number(amount),
              commission: COMMISSION_AMOUNT,
              finalAmount: Number(amount) + COMMISSION_AMOUNT,
              recipientName,
              accountNumber,
              concept,
              concept2
            })
          }
        });
      }

    } catch (error) {
      console.error('Error in transfer:', error);
      Toast.show({
        type: 'error',
        text1: 'Error en la transferencia',
        text2: 'Por favor intenta de nuevo más tarde',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Confirmar depósito</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <Text style={styles.amount}>{parseFloat(amount).toFixed(2)}</Text>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.label}>Comisión</Text>
            <Text style={styles.value}>${COMMISSION_AMOUNT.toFixed(2)}</Text>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.totalValue}>
              ${(parseFloat(amount) + COMMISSION_AMOUNT).toFixed(2)}
            </Text>
          </View>

          <View style={styles.recipientCard}>
            <Text style={styles.label}>Destinatario</Text>
            <Text style={styles.recipientName}>{recipientName}</Text>
            <Text style={styles.accountNumber}>{accountNumber}</Text>
          </View>

          <View style={styles.conceptContainer}>
            <Text style={styles.label}>Concepto</Text>
            <TextInput
              style={styles.conceptInput}
              placeholder="Agregar concepto"
              value={concept}
              onChangeText={setConcept}
              placeholderTextColor={colors.darkGray}
            />
          </View>

          <View style={styles.conceptContainer}>
            <Text style={styles.label}>Concepto 2 (opcional)</Text>
            <TextInput
              style={styles.conceptInput}
              placeholder="Agregar concepto adicional"
              value={concept2}
              onChangeText={setConcept2}
              placeholderTextColor={colors.darkGray}
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.confirmButton,
              isLoading && styles.confirmButtonDisabled
            ]}
            onPress={handleConfirm}
            disabled={isLoading}
          >
            <Text style={styles.confirmButtonText}>
              {isLoading ? 'Procesando...' : 'Confirmar transferencia'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'ClashDisplay',
    fontSize: 20,
    color: colors.black,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  currencySymbol: {
    fontFamily: 'ClashDisplay',
    fontSize: 56,
    color: colors.black,
    marginRight: 8,
  },
  amount: {
    fontFamily: 'ClashDisplay',
    fontSize: 56,
    color: colors.black,
  },
  recipientCard: {
    backgroundColor: colors.beige,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },
  recipientName: {
    fontFamily: 'ClashDisplay',
    fontSize: 18,
    color: colors.black,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 16,
    color: colors.darkGray,
  },
  conceptContainer: {
    marginBottom: 32,
  },
  conceptInput: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.beige,
    paddingVertical: 8,
  },
  confirmButton: {
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto', // Pushes button to bottom
  },
  confirmButtonText: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.white,
  },
  detailsCard: {
    backgroundColor: colors.beige,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  value: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  totalValue: {
    fontFamily: 'ClashDisplay',
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  confirmButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
});

const toastStyles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
    marginBottom: 4,
  },
  message: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: colors.darkGray,
  },
});
