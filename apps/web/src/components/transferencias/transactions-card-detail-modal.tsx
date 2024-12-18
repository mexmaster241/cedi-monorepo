import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconDownload, IconPrinter } from "@tabler/icons-react"
import { pdf } from '@react-pdf/renderer';
import { TransactionProofPDF } from './comprobante';

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

interface TransactionCardDetailProps {
    isOpen: boolean;
    onClose: () => void;
    movement: Movement | null;
}

export function TransactionCardDetailModal({ isOpen, onClose, movement }: TransactionCardDetailProps) {
    if (!movement) return null;

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            'COMPLETED': 'Liquidado',
            'REVERSED': 'Devuelto',
            'FAILED': 'Cancelado',
            'PENDING': 'En espera'
        };
        return statusMap[status] || status;
    };

    const handleDownload = async () => {
        if (!movement) return;
        
        try {
            // Generate the PDF blob
            const blob = await pdf(<TransactionProofPDF movement={{...movement, counterpartyClabe: movement.counterpartyClabe || ''}} />).toBlob();
            
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.download = `comprobante-${movement.trackingId}.pdf`;
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-clash-display">Detalles de la Transferencia</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="text-center">
                            <h3 className="font-clash-display text-lg">Comprobante de Transferencia</h3>
                            <p className="text-muted-foreground font-clash-display">#{movement.trackingId}</p>
                        </div>

                        <div className="border-t border-b py-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Fecha:</span>
                                <span className="font-medium font-clash-display">
                                    {movement.createdAt ? new Date(movement.createdAt).toLocaleString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">
                                    {movement.direction === 'INBOUND' ? 'Remitente:' : 'Beneficiario:'}
                                </span>
                                <span className="font-medium font-clash-display">{movement.counterpartyName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Banco:</span>
                                <span className="font-medium font-clash-display">{movement.counterpartyBank}</span>
                            </div>
                            {movement.counterpartyClabe && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground font-clash-display">CLABE:</span>
                                    <span className="font-medium font-clash-display">{movement.counterpartyClabe}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Tipo:</span>
                                <span className="font-medium font-clash-display">
                                    {movement.direction === 'INBOUND' ? 'Depósito' : 'Retiro'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Estatus:</span>
                                <span className="font-medium font-clash-display">{getStatusLabel(movement.status)}</span>
                            </div>
                            {movement.concept && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground font-clash-display">Concepto:</span>
                                    <span className="font-medium font-clash-display">{movement.concept}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-b py-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Monto:</span>
                                <span className="font-medium font-clash-display">
                                    ${movement.amount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground font-clash-display">Comisión:</span>
                                <span className="font-medium font-clash-display">
                                    ${movement.commission.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="font-clash-display">Monto Final:</span>
                                <span className="font-clash-display">
                                    ${movement.finalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 font-clash-display"
                        onClick={handleDownload}
                    >
                        <IconDownload className="h-4 w-4" />
                        Descargar
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 font-clash-display"
                        onClick={() => window.print()}
                    >
                        <IconPrinter className="h-4 w-4" />
                        Imprimir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}