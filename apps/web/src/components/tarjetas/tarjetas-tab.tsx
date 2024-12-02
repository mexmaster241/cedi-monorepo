import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { IconDotsVertical, IconCopy, IconCheck } from "@tabler/icons-react"
  import { useState } from "react"
  import { useToast } from "@/hooks/use-toast"
  import { CardDetailsModal } from "./card-details-modal"
  
  export function TarjetasTab() {
    const { toast } = useToast()
    const [copiedCardId, setCopiedCardId] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const handleCopyCardNumber = async (cardNumber: string, cardId: string) => {
      try {
        await navigator.clipboard.writeText(cardNumber)
        setCopiedCardId(cardId)
        toast({
          description: "Número de tarjeta copiado al portapapeles",
        })
        
        // Reset the copy icon after 2 seconds
        setTimeout(() => {
          setCopiedCardId(null)
        }, 2000)
      } catch (err) {
        toast({
          variant: "destructive",
          description: "Error al copiar el número de tarjeta",
        })
      }
    }
  
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
  
    return (
      <div className="space-y-6">
        <div className="relative overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-clash-display">ID Cuenta</TableHead>
                  <TableHead className="font-clash-display">ID</TableHead>
                  <TableHead className="font-clash-display">Propietario de la cuenta</TableHead>
                  <TableHead className="font-clash-display text-right">Balance</TableHead>
                  <TableHead className="font-clash-display text-right">Cargos pendientes</TableHead>
                  <TableHead className="font-clash-display">Modelo de tarjeta</TableHead>
                  <TableHead className="font-clash-display">Número de tarjeta</TableHead>
                  <TableHead className="font-clash-display text-center">Más</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>ACC-001</TableCell>
                  <TableCell>CARD-001</TableCell>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell className="text-right">$5,000.00</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                  <TableCell>Visa Platinum</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">4532 7589 1234 5678</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyCardNumber("4532758912345678", "CARD-001")}
                        className="h-6 w-6"
                      >
                        {copiedCardId === "CARD-001" ? (
                          <IconCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <IconCopy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <IconDotsVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </div>
        </div>

        <CardDetailsModal 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          cardData={mockCardData}
        />
      </div>
    )
  }