"use client"

import { useState, useEffect } from "react"
import { BalanceCard } from "@/components/dashboard/BalanceCard"
import { TransferenciasLimite } from "@/components/dashboard/TransferenciasLimite"
import { MPOSLimit } from "@/components/dashboard/MPOSLimit"
import { EcommerceLimits } from "@/components/dashboard/EcommerceLimits"
import { RecentTransactions } from "@/components/dashboard/RecentTransactions"
import RevenueChart from "@/components/dashboard/RevenueChart"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransferirForm } from "@/components/transferencias/TransferirForm"
import { CardDetailsModal } from "@/components/tarjetas/card-details-modal"
import { IconArrowDown, IconArrowUp, IconCreditCard, IconCopy, IconCheck } from "@tabler/icons-react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)
  const [copiedClabe, setCopiedClabe] = useState(false)
  const { toast } = useToast()

  const CLABE = "123456789012345678" // Replace with actual CLABE
  const mockCardData = {
    modelo: "Visa Platinum",
    numero: "4532 7589 1234 5678",
    mesExpiracion: "12",
    añoExpiracion: "2025",
    nombre: "Juan Pérez",
    activa: true,
    limiteRetiroDiario: 10000,
    limiteRetiroATM: 5000,
  }

  const handleCopyClabe = async () => {
    try {
      await navigator.clipboard.writeText(CLABE)
      setCopiedClabe(true)
      toast({
        description: "CLABE copiada al portapapeles",
      })
      setTimeout(() => setCopiedClabe(false), 2000)
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Error al copiar CLABE",
      })
    }
  }

  const transactions = [
    { 
      producto: 'MPOS',
      tipo: 'Venta',
      estatus: 'Completado',
      monto: 85.20,
      date: '2024-03-20'
    },
    { 
      producto: 'Transferencias',
      tipo: 'Pago',
      estatus: 'Procesando',
      monto: -120.00,
      date: '2024-03-19'
    },
    { 
      producto: 'E-commerce',
      tipo: 'Venta Online',
      estatus: 'Completado',
      monto: 65.99,
      date: '2024-03-18'
    },
  ]

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="p-4 max-w-full overflow-hidden space-y-6">
        <div className="mb-4">
          <h1 className="text-xl font-clash-display mb-2">Bienvenido</h1>
        </div>
        <div className="w-full">
          <BalanceCard 
            balance={5240.50} 
            className="w-full max-w-full transform transition-all duration-200 hover:scale-105 hover:shadow-lg" 
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={() => setShowReceiveModal(true)}
          >
            <IconArrowDown className="h-6 w-6" />
            <span className="text-xs font-clash-display">Recibir</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={() => setShowSendModal(true)}
          >
            <IconArrowUp className="h-6 w-6" />
            <span className="text-xs font-clash-display">Enviar</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={() => setShowCardModal(true)}
          >
            <IconCreditCard className="h-6 w-6" />
            <span className="text-xs font-clash-display">Tarjeta</span>
          </Button>
        </div>

        <RecentTransactions transactions={transactions} />

        {/* Receive Money Modal */}
        <Dialog open={showReceiveModal} onOpenChange={setShowReceiveModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-clash-display">Tu CLABE</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="font-mono">{CLABE}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyClabe}
                >
                  {copiedClabe ? (
                    <IconCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <IconCopy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-clash-display">
                Comparte esta CLABE para recibir transferencias
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Send Money Modal */}
        <Dialog open={showSendModal} onOpenChange={setShowSendModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-clash-display">Realizar Transferencia</DialogTitle>
            </DialogHeader>
            <TransferirForm />
          </DialogContent>
        </Dialog>

        {/* Card Details Modal */}
        <CardDetailsModal 
          open={showCardModal}
          onOpenChange={setShowCardModal}
          cardData={mockCardData}
        />
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-2xl">
          <BalanceCard 
            balance={5240.50} 
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg" 
          />
          <TransferenciasLimite 
            transferenciasRecibidas={1500000} 
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          />
          <MPOSLimit 
            currentAmount={1000000} 
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          />
          <EcommerceLimits 
            currentAmount={1000000} 
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          />
        </div>
        <div className="flex-1 h-[400px] lg:h-[500px]">
          <RevenueChart className="w-full h-full" />
        </div>
      </div>
      
      <RecentTransactions transactions={transactions} />
    </div>
  )
}
