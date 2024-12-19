import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';


interface Movement {
    id: string;
    claveRastreo: string;
    createdAt?: string;
    counterpartyName: string;
    counterpartyClabe: string;
    direction: string;
    amount: number;
    commission: number;
    finalAmount: number;
    externalReference?: string;
    internalReference?: string;
    counterpartyBank: string;
    concept?: string;
    status: string;
}

const SLATE = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: SLATE[50],
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        marginBottom: 20,
        objectFit: 'contain',
        objectPosition: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        color: SLATE[900],
    },
    subtitle: {
        fontSize: 12,
        color: SLATE[500],
        marginBottom: 15,
    },
    section: {
        marginBottom: 10,
        borderBottom: 1,
        borderBottomColor: SLATE[200],
        paddingBottom: 10,
    },
    subsection: {
        marginBottom: 10,
        paddingBottom: 5,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 5,
        color: SLATE[900],
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center',
    },
    label: {
        color: SLATE[500],
        fontSize: 10,
    },
    value: {
        fontSize: 10,
        color: SLATE[900],
    },
    total: {
        marginTop: 10,
        borderTop: 1,
        borderTopColor: SLATE[200],
        paddingTop: 10,
    },
    totalText: {
        fontSize: 12,
        color: SLATE[900],
    },
});

interface Movement {
    id: string;
    claveRastreo: string;
    createdAt?: string;
    counterpartyName: string;
    counterpartyClabe: string;
    direction: string;
    amount: number;
    commission: number;
    finalAmount: number;
    externalReference?: string;
    internalReference?: string;
    counterpartyBank: string;
    concept?: string;
    status: string;
}

const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
        'COMPLETED': 'Liquidado',
        'REVERSED': 'Devuelto',
        'FAILED': 'Cancelado',
        'PENDING': 'En espera'
    };
    return statusMap[status] || status;
};

export const TransactionProofPDF = ({ movement }: { movement: Movement }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image 
                        style={styles.logo}
                        src="/logotipo.png"
                    />
                    <Text style={styles.title}>Comprobante de Transferencia</Text>
                    <Text style={styles.subtitle}>#{movement.claveRastreo}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha:</Text>
                        <Text style={styles.value}>
                            {movement.createdAt ? new Date(movement.createdAt).toLocaleString() : 'N/A'}
                        </Text>
                    </View>

                    {/* Ordenante Information */}
                    <View style={styles.subsection}>
                        <Text style={styles.sectionTitle}>Ordenante</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.value}>{movement.counterpartyName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Banco:</Text>
                            <Text style={styles.value}>CEDI</Text>
                        </View>
                    </View>

                    {/* Beneficiary Information */}
                    <View style={styles.subsection}>
                        <Text style={styles.sectionTitle}>Beneficiario</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.value}>{movement.counterpartyName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>CLABE:</Text>
                            <Text style={styles.value}>{movement.counterpartyClabe}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Banco:</Text>
                            <Text style={styles.value}>{movement.counterpartyBank}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Estatus:</Text>
                        <Text style={styles.value}>{getStatusLabel(movement.status)}</Text>
                    </View>
                    {movement.concept && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Concepto:</Text>
                            <Text style={styles.value}>{movement.concept}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Monto:</Text>
                        <Text style={styles.value}>${movement.amount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Comisión:</Text>
                        <Text style={styles.value}>${movement.commission.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.total}>
                    <View style={styles.row}>
                        <Text style={styles.totalText}>Monto Final:</Text>
                        <Text style={styles.totalText}>${movement.finalAmount.toFixed(2)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};