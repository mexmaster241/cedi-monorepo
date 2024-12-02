import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateTimeRange } from "../transferencias/DateRange"
import { useState, useRef } from "react"
import { DateRange } from "react-day-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransactionsTable } from "./TransactionsTable"

interface FilterState {
  dates: DateRange;
  times: {
    from: string;
    to: string;
  };
}

export function TransactionsTab() {
  const [search, setSearch] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<FilterState>()
  const [tipoTransaccion, setTipoTransaccion] = useState("todo")
  const [estatusTransaccion, setEstatusTransaccion] = useState("todo")
  const dateTimeRangeRef = useRef<{ reset: () => void }>(null)

  const handleFilter = () => {
    console.log({
      search,
      dateTimeRange,
      tipoTransaccion,
      estatusTransaccion
    })
  }

  const handleClear = () => {
    setSearch("")
    setDateTimeRange(undefined)
    setTipoTransaccion("todo")
    setEstatusTransaccion("todo")
    dateTimeRangeRef.current?.reset()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <Input
          className="font-clash-display"
          placeholder="Buscar transacción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Date Time Range */}
        <DateTimeRange 
          ref={dateTimeRangeRef}
          onRangeChange={setDateTimeRange}
        />

        {/* Select Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={tipoTransaccion} onValueChange={setTipoTransaccion}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Tipo de transacción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="venta">Venta</SelectItem>
              <SelectItem className="font-clash-display" value="devolucion">Devolución</SelectItem>
              <SelectItem className="font-clash-display" value="anulacion">Anulación</SelectItem>
            </SelectContent>
          </Select>

          <Select value={estatusTransaccion} onValueChange={setEstatusTransaccion}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Estatus de transacción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="aprobada">Aprobada</SelectItem>
              <SelectItem className="font-clash-display" value="rechazada">Rechazada</SelectItem>
              <SelectItem className="font-clash-display" value="pendiente">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleFilter} className="flex-1 font-clash-display">
            Filtrar
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex-1 font-clash-display">
            Limpiar
          </Button>
        </div>
      </div>
      <TransactionsTable />
    </div>
  )
}