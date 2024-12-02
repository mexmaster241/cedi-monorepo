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
}

interface TransactionDetailsProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsProps) {
  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-clash-display">Detalles de la Transacción</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="text-center">
              <h3 className="font-clash-display text-lg">Comprobante de Transacción</h3>
              <p className="text-muted-foreground font-clash-display">#{transaction.id}</p>
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Fecha:</span>
                <span className="font-medium font-clash-display">{transaction.fecha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Tarjetahabiente:</span>
                <span className="font-medium font-clash-display">{transaction.tarjetahabiente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Tarjeta:</span>
                <span className="font-medium font-clash-display">{transaction.tarjeta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Tipo:</span>
                <span className="font-medium font-clash-display">{transaction.tipo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Tienda:</span>
                <span className="font-medium font-clash-display">{transaction.tienda}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Referencia:</span>
                <span className="font-medium font-clash-display">{transaction.referencia}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">No. Autorización:</span>
                <span className="font-medium font-clash-display">{transaction.autorizacion}</span>
              </div>
            </div>

            <div className="border-b py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Monto:</span>
                <span className="font-medium font-clash-display">{transaction.monto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Comisión:</span>
                <span className="font-medium font-clash-display">{transaction.comision}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Cashback:</span>
                <span className="font-medium font-clash-display">{transaction.cashback}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-clash-display">Recargo:</span>
                <span className="font-medium font-clash-display">{transaction.recargo}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="font-clash-display">Cargo Final:</span>
                <span className="font-clash-display">{transaction.cargoFinal}</span>
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