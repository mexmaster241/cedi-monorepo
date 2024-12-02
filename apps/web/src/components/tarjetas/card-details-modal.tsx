import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface CardDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardData: {
    modelo: string
    numero: string
    mesExpiracion: string
    añoExpiracion: string
    nombre: string
    activa: boolean
    limiteRetiroDiario: number
    limiteRetiroATM: number
  }
}

export function CardDetailsModal({ open, onOpenChange, cardData }: CardDetailsModalProps) {
  const [isActive, setIsActive] = useState(cardData.activa)
  const [limiteRetiroDiario, setLimiteRetiroDiario] = useState(cardData.limiteRetiroDiario)
  const [limiteRetiroATM, setLimiteRetiroATM] = useState(cardData.limiteRetiroATM)

  const handleSave = () => {
    // Handle save logic here
    console.log({
      isActive,
      limiteRetiroDiario,
      limiteRetiroATM
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-clash-display">Detalles de la Tarjeta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label className="font-clash-display">Modelo de tarjeta</Label>
            <p className="text-sm text-muted-foreground">{cardData.modelo}</p>
          </div>

          <div className="space-y-2">
            <Label className="font-clash-display">Tarjeta</Label>
            <p className="text-sm font-mono">{cardData.numero}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-clash-display">Mes de expiración</Label>
              <p className="text-sm text-muted-foreground">{cardData.mesExpiracion}</p>
            </div>
            <div className="space-y-2">
              <Label className="font-clash-display">Año de expiración</Label>
              <p className="text-sm text-muted-foreground">{cardData.añoExpiracion}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-clash-display">Nombre del usuario</Label>
            <p className="text-sm text-muted-foreground">{cardData.nombre}</p>
          </div>

          <div className="flex items-center justify-between">
            <Label className="font-clash-display">Estatus de tarjeta</Label>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">
                {isActive ? "Activada" : "Desactivada"}
              </Label>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-clash-display">Límite diario de retiro</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={limiteRetiroDiario}
                onChange={(e) => setLimiteRetiroDiario(Number(e.target.value))}
                className="font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-clash-display">Límite de retiro en ATM</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={limiteRetiroATM}
                onChange={(e) => setLimiteRetiroATM(Number(e.target.value))}
                className="font-mono"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full font-clash-display">
          Guardar
        </Button>
      </DialogContent>
    </Dialog>
  )
}