"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateTimeRange } from "./DateRange"
import { useState, useEffect } from "react"
import { DateRange } from "react-day-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransaccionesTable } from "./TransaccionesTable"
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { type Schema } from 'config/amplify/data/resource'
import { getCurrentUser } from 'aws-amplify/auth'
import { amplifyConfig } from 'config';
import { useRef } from 'react'

Amplify.configure(amplifyConfig)

interface FilterState {
  dates: DateRange;
  times: {
    from: string;
    to: string;
  };
}

interface Movement {
  id: string;
  category: string;      
  direction: string;     
  status: string;        
  amount: number;
  commission: number;
  finalAmount: number;
  trackingId: string;
  externalReference?: string;
  internalReference?: string;
  counterpartyName: string;
  counterpartyBank: string;
  counterpartyClabe?: string;
  counterpartyEmail?: string;
  concept?: string;
  createdAt?: string;
}

export default function MovimientosFilter() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMovements() {
      try {
        setLoading(true);
        setError(null);

        const currentUser = await getCurrentUser();
        if (!currentUser?.username) {
          throw new Error('No user authenticated');
        }

        const client = generateClient<Schema>();
        
        await new Promise(resolve => setTimeout(resolve, 100));

        const response = await client.models.Movement.list({
          filter: { userId: { eq: currentUser.username } },
          authMode: 'userPool'
        });

        if (isMounted) {
          if (response?.data) {
            const sortedMovements = [...response.data].sort((a, b) => {
              return new Date(b?.createdAt ?? 0).getTime() - 
                     new Date(a?.createdAt ?? 0).getTime();
            });
            setMovements(sortedMovements as Movement[]);
          } else {
            console.log('No movements found');
            setMovements([]);
          }
        }
      } catch (err) {
        console.error('Error fetching movements:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error fetching movements');
          setMovements([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMovements();

    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setSearch] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<FilterState>()
  const [tipoMovimiento, setTipoMovimiento] = useState("todo")
  const [estatusMovimiento, setEstatusMovimiento] = useState("todo")
  const dateTimeRangeRef = useRef<{ reset: () => void }>(null)

  const handleFilter = async () => {
    try {
      setLoading(true);
      const { username } = await getCurrentUser();
      
      let filter: any = {
        userId: { eq: username }
      };
      
      if (search) {
        filter.or = [
          { externalReference: { contains: search } },
          { internalReference: { contains: search } },
          { counterpartyName: { contains: search } }
        ];
      }
      
      if (tipoMovimiento !== 'todo') {
        // Map UI categories to schema categories
        const categoryMap: Record<string, { category: string; direction: string }> = {
          'deposito': { category: 'WIRE', direction: 'INBOUND' },
          'retiro': { category: 'WIRE', direction: 'OUTBOUND' },
          'mensualidad': { category: 'INTERNAL', direction: 'OUTBOUND' }
        };
        
        if (categoryMap[tipoMovimiento]) {
          filter.and = [
            { category: { eq: categoryMap[tipoMovimiento].category } },
            { direction: { eq: categoryMap[tipoMovimiento].direction } }
          ];
        }
      }
      
      if (estatusMovimiento !== 'todo') {
        // Map UI status to schema status
        const statusMap: Record<string, string> = {
          'liquidado': 'COMPLETED',
          'devolucion': 'REVERSED',
          'cancelacion': 'FAILED',
          'en-espera': 'PENDING'
        };
        
        filter.status = { eq: statusMap[estatusMovimiento] };
      }
      
      if (dateTimeRange?.dates) {
        filter.createdAt = {
          between: [
            `${dateTimeRange.dates.from}T${dateTimeRange.times.from}:00`,
            `${dateTimeRange.dates.to}T${dateTimeRange.times.to}:59`
          ]
        };
      }

      const client = generateClient<Schema>();
      await new Promise(resolve => setTimeout(resolve, 100));

      const { data } = await client.models.Movement.list({
        filter,
        authMode: 'userPool'
      });

      setMovements(data as Movement[]);
    } catch (error) {
      console.error('Error filtering movements:', error);
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
        movements={movements} 
        loading={loading}
        error={error}
      />
    </div>
  )
}