"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateTimeRange } from "./DateRange"
import { useState, useRef, useEffect } from "react"
import { DateRange } from "react-day-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransaccionesTable } from "./TransaccionesTable"
import { generateClient } from 'aws-amplify/api';
import { type Schema } from 'config/amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

interface FilterState {
  dates: DateRange;
  times: {
    from: string;
    to: string;
  };
}

export default function MovimientosFilter() {
  const [transactions, setTransactions] = useState<Array<{
    id: string;
    type: string;
    status: string;
    amount: number;
    commission: number;
    finalAmount: number;
    reference: string | null;
    beneficiaryName: string | null;
    createdAt: string | null;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        console.log("Getting current user...");
        const { username } = await getCurrentUser();
        console.log("Current user:", username);
        
        console.log("Fetching transactions...");
        const { data } = await client.models.Transaction.list({
          filter: { userId: { eq: username } },
          authMode: 'userPool',
          selectionSet: ['id', 'type', 'status', 'amount', 'commission', 'finalAmount', 'reference', 'beneficiaryName', 'createdAt']
        });
        console.log("Transactions data:", data);
        
        setTransactions(data);
      } catch (err: unknown) {
        
      }
    }
    fetchTransactions();
  }, []);

  const [search, setSearch] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<FilterState>()
  const [tipoMovimiento, setTipoMovimiento] = useState("todo")
  const [estatusMovimiento, setEstatusMovimiento] = useState("todo")
  const dateTimeRangeRef = useRef<{ reset: () => void }>(null)

  const handleFilter = async () => {
    try {
      setLoading(true);
      let filter: any = {};
      
      if (search) {
        filter.or = [
          { reference: { contains: search } },
          { beneficiaryName: { contains: search } }
        ];
      }
      
      if (tipoMovimiento !== 'todo') {
        filter.type = { eq: tipoMovimiento };
      }
      
      if (estatusMovimiento !== 'todo') {
        filter.status = { eq: estatusMovimiento };
      }
      
      if (dateTimeRange?.dates) {
        filter.createdAt = {
          between: [
            `${dateTimeRange.dates.from}T${dateTimeRange.times.from}:00`,
            `${dateTimeRange.dates.to}T${dateTimeRange.times.to}:59`
          ]
        };
      }

      const { data } = await client.models.Transaction.list({
        filter: filter,
        authMode: 'userPool',
        selectionSet: [
          'id',
          'type',
          'status',
          'amount',
          'commission',
          'finalAmount',
          'reference',
          'beneficiaryName',
          'createdAt'
        ]
      });
      setTransactions(data);
    } catch (error) {
      console.error('Error filtering transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearch("")
    setDateTimeRange(undefined)
    setTipoMovimiento("todo")
    setEstatusMovimiento("todo")
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
          <Select value={tipoMovimiento} onValueChange={setTipoMovimiento}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Tipo de movimiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="deposito">Depósito</SelectItem>
              <SelectItem className="font-clash-display" value="retiro">Retiro</SelectItem>
              <SelectItem className="font-clash-display" value="mensualidad">Mensualidad</SelectItem>
            </SelectContent>
          </Select>

          <Select value={estatusMovimiento} onValueChange={setEstatusMovimiento}>
            <SelectTrigger className="font-clash-display">
              <SelectValue placeholder="Estatus de movimiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="todo">Todo</SelectItem>
              <SelectItem className="font-clash-display" value="liquidado">Liquidado</SelectItem>
              <SelectItem className="font-clash-display" value="devolucion">Devolución</SelectItem>
              <SelectItem className="font-clash-display" value="cancelacion">Cancelación</SelectItem>
              <SelectItem className="font-clash-display" value="en-espera">En espera</SelectItem>
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
      <TransaccionesTable 
        transactions={transactions} 
        loading={loading} 
      />
    </div>
  )
}