import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Movement {
    id: string;
    trackingId: string;
    createdAt?: string;
    counterpartyName: string;
    direction: string;
    amount: number;
    commission: number;
    finalAmount: number;
    externalReference?: string;
    internalReference?: string;
    counterpartyBank: string;
    counterpartyClabe?: string;
    concept?: string;
    status: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 15,
    },
    section: {
        marginBottom: 10,
        borderBottom: '1 solid #eee',
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        color: '#666',
        fontSize: 10,
    },
    value: {
        fontSize: 10,
    },
    total: {
        marginTop: 10,
    },
    totalText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
        'COMPLETED': 'Liquidado',
        'REVERSED': 'Devuelto',
        'FAILED': 'Cancelado',
        'PENDING': 'En espera'
    };
    return statusMap[status] || status;
};

export const TransactionProofPDF = ({ movement }: { movement: Movement }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Comprobante de Transferencia</Text>
                <Text style={styles.subtitle}>#{movement.trackingId}</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>
                        {movement.createdAt ? new Date(movement.createdAt).toLocaleString() : 'N/A'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        {movement.direction === 'OUTBOUND' ? 'Beneficiario:' : 'Remitente:'}
                    </Text>
                    <Text style={styles.value}>{movement.counterpartyName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Banco:</Text>
                    <Text style={styles.value}>{movement.counterpartyBank}</Text>
                </View>
                {movement.counterpartyClabe && (
                    <View style={styles.row}>
                        <Text style={styles.label}>CLABE:</Text>
                        <Text style={styles.value}>{movement.counterpartyClabe}</Text>
                    </View>
                )}
                <View style={styles.row}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.value}>
                        {movement.direction === 'OUTBOUND' ? 'Depósito' : 'Retiro'}
                    </Text>
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