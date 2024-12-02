import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateTimeRange } from "@/components/transferencias/DateRange"
import { useState, useRef } from "react"
import { DateRange } from "react-day-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconDownload, IconEye } from "@tabler/icons-react"
import { TransactionDetailsModal } from "./transaction-details-modal"


interface FilterState {
  dates: DateRange;
  times: {
    from: string;
    to: string;
  };
}

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

export function MovimientosTab() {
  const [search, setSearch] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<FilterState>()
  const [tipo, setTipo] = useState("todo")
  const [estatus, setEstatus] = useState("todo")
  const [selectedCard, setSelectedCard] = useState<string>("all")
  const dateTimeRangeRef = useRef<{ reset: () => void }>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleFilter = () => {
    console.log({
      selectedCard,
      search,
      dateTimeRange,
      tipo,
      estatus
    })
  }

  const handleClear = () => {
    setSelectedCard("all")
    setSearch("")
    setDateTimeRange(undefined)
    setTipo("todo")
    setEstatus("todo")
    dateTimeRangeRef.current?.reset()
  }

  // Example transaction data
  const sampleTransaction: Transaction = {
    id: "TRX-001",
    fecha: "2024-03-21",
    tarjetahabiente: "Juan Pérez",
    tarjeta: "**** 1234",
    tipo: "Compra",
    tienda: "Tienda ABC",
    referencia: "REF123",
    autorizacion: "AUTH456",
    monto: "$1,000.00",
    comision: "$39.00",
    cashback: "$10.00",
    recargo: "$0.00",
    cargoFinal: "$1,029.00"
  }

  return (
    <div className="space-y-6">
      {/* Filters Section - Not scrollable */}
      <div className="flex flex-col gap-4">
        {/* Card Selection */}
        <Select value={selectedCard} onValueChange={setSelectedCard}>
          <SelectTrigger className="font-clash-display">
            <SelectValue placeholder="Seleccionar Tarjeta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="font-clash-display" value="all">Todas las tarjetas</SelectItem>
            <SelectItem className="font-clash-display" value="card1">**** 1234</SelectItem>
            <SelectItem className="font-clash-display" value="card2">**** 5678</SelectItem>
            <SelectItem className="font-clash-display" value="card3">**** 9012</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            className="font-clash-display"
            placeholder="Buscar por ID o tarjetahabiente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <DateTimeRange 
            ref={dateTimeRangeRef}
            onRangeChange={setDateTimeRange}
          />

          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Tipo de movimiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="compra">Compra</SelectItem>
              <SelectItem className="font-clash-display" value="retiro">Retiro</SelectItem>
              <SelectItem className="font-clash-display" value="devolucion">Devolución</SelectItem>
            </SelectContent>
          </Select>

          <Select value={estatus} onValueChange={setEstatus}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Estatus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="aprobado">Aprobado</SelectItem>
              <SelectItem className="font-clash-display" value="rechazado">Rechazado</SelectItem>
              <SelectItem className="font-clash-display" value="pendiente">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFilter} className="flex-1 font-clash-display">
            Filtrar
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex-1 font-clash-display">
            Limpiar
          </Button>
        </div>
      </div>

      {/* Table Section - Modified */}
      <div className="relative overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-clash-display sticky left-0 bg-background">Fecha</TableHead>
                <TableHead className="font-clash-display">ID</TableHead>
                <TableHead className="font-clash-display">Tarjetahabiente</TableHead>
                <TableHead className="font-clash-display">Tarjeta</TableHead>
                <TableHead className="font-clash-display">Tipo</TableHead>
                <TableHead className="font-clash-display">Estatus</TableHead>
                <TableHead className="font-clash-display">Tienda</TableHead>
                <TableHead className="font-clash-display">Referencia</TableHead>
                <TableHead className="font-clash-display">No. Autorización</TableHead>
                <TableHead className="font-clash-display text-right">Monto</TableHead>
                <TableHead className="font-clash-display text-right">Comisión</TableHead>
                <TableHead className="font-clash-display text-right">Cashback</TableHead>
                <TableHead className="font-clash-display text-right">Recargo</TableHead>
                <TableHead className="font-clash-display text-right">Cargo Final</TableHead>
                <TableHead className="font-clash-display text-center sticky right-0 bg-background">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="sticky left-0 bg-background">2024-03-21</TableCell>
                <TableCell>TRX-001</TableCell>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>**** 1234</TableCell>
                <TableCell>Compra</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                    Aprobado
                  </span>
                </TableCell>
                <TableCell>Tienda ABC</TableCell>
                <TableCell>REF123</TableCell>
                <TableCell>AUTH456</TableCell>
                <TableCell className="text-right">$1,000.00</TableCell>
                <TableCell className="text-right">$39.00</TableCell>
                <TableCell className="text-right">$10.00</TableCell>
                <TableCell className="text-right">$0.00</TableCell>
                <TableCell className="text-right">$1,029.00</TableCell>
                <TableCell className="sticky right-0 bg-background">
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon">
                      <IconDownload className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="font-clash-display"
                      onClick={() => setSelectedTransaction(sampleTransaction)}
                    >
                      <IconEye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </div>
      </div>

      <TransactionDetailsModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  )
}