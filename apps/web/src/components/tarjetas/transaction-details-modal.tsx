import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconDownload, IconPrinter } from "@tabler/icons-react"

// Define proper transaction type
interface Transaction {
  id: string
  fecha: string
  tarjetahabiente: string
  tarjeta: string
  tipo: string
  tienda: string
  referencia: string
  autorizacion: string
  monto: string
  comision: string
  cashback: string
  recargo: string
  cargoFinal: string
  trackingId: string
  createdAt?: string
  direction: string
  amount: number
  commission: number
  finalAmount: number
  counterpartyName: string
  counterpartyClabe?: string
  counterpartyBank: string
  concept?: string
  status: string
  userId: string
}

interface TransactionDetailsProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsProps) {
  if (!transaction) return null

  const isOutbound = transaction.direction === 'OUTBOUND'

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
              <p className="text-muted-foreground font-clash-display">#{transaction.trackingId}</p>
            </div>

            <div className="border-t border-b py-4 space-y-4">
              {/* Sender Information */}
              <div className="space-y-2">
                <h4 className="font-clash-display font-medium">Remitente</h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">Nombre:</span>
                  <span className="font-medium font-clash-display">
                    {isOutbound ? transaction.userId : transaction.counterpartyName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">CLABE:</span>
                  <span className="font-medium font-clash-display">
                    {isOutbound ? transaction.userId : transaction.counterpartyClabe}
                  </span>
                </div>
              </div>

              {/* Recipient Information */}
              <div className="space-y-2">
                <h4 className="font-clash-display font-medium">Beneficiario</h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">Nombre:</span>
                  <span className="font-medium font-clash-display">
                    {isOutbound ? transaction.counterpartyName : transaction.userId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">CLABE:</span>
                  <span className="font-medium font-clash-display">
                    {isOutbound ? transaction.counterpartyClabe : transaction.userId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">Banco:</span>
                  <span className="font-medium font-clash-display">{transaction.counterpartyBank}</span>
                </div>
              </div>

              {transaction.concept && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-clash-display">Concepto:</span>
                  <span className="font-medium font-clash-display">{transaction.concept}</span>
                </div>
              )}
            </div>

            <div className="border-b py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Monto:</span>
                <span className="font-medium font-clash-display">${transaction.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Comisión:</span>
                <span className="font-medium font-clash-display">${transaction.commission.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="font-clash-display">Monto Final:</span>
                <span className="font-clash-display">${transaction.finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-clash-display"
            onClick={() => {/* Add download logic */}}
          >
            <IconDownload className="h-4 w-4" />
            Descargar
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 font-clash-display"
            onClick={() => {/* Add print logic */}}
          >
            <IconPrinter className="h-4 w-4" />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}