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
import { IconEye } from "@tabler/icons-react"
import { TransactionCardDetailModal } from "./transactions-card-detail-modal"

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
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

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

  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilter();
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]); // Trigger when search changes

  const [dateTimeRange, setDateTimeRange] = useState<FilterState>()
  const [tipoMovimiento, setTipoMovimiento] = useState("todo")
  const [estatusMovimiento, setEstatusMovimiento] = useState("todo")
  const dateTimeRangeRef = useRef<{ reset: () => void }>(null)

  const handleFilter = async () => {
    try {
      setLoading(true);
      const { username } = await getCurrentUser();
      const client = generateClient<Schema>();
      
      // Base filter only checks userId since counterpartyClabe contains full ID
      let filter: any = { userId: { eq: username } };
      
      // Add search filter if there's a search term
      if (search.trim()) {
        filter.and = [{
          or: [
            { counterpartyName: { contains: search.toLowerCase() } },
            { concept: { contains: search.toLowerCase() } },
            { trackingId: { contains: search } },
            { internalReference: { contains: search } },
            { externalReference: { contains: search } }
          ]
        }];
      }
      
      // Add movement type filter
      if (tipoMovimiento !== 'todo') {
        const typeFilters = {
          'deposito': { direction: { eq: 'INBOUND' } },
          'retiro': { direction: { eq: 'OUTBOUND' } },
          'mensualidad': { category: { eq: 'INTERNAL' } }
        };
        
        if (typeFilters[tipoMovimiento as keyof typeof typeFilters]) {
          filter.and = filter.and || [];
          filter.and.push(typeFilters[tipoMovimiento as keyof typeof typeFilters]);
        }
      }
      
      // Add status filter
      if (estatusMovimiento !== 'todo') {
        const statusMap = {
          'liquidado': 'COMPLETED',
          'devolucion': 'REVERSED',
          'cancelacion': 'FAILED',
          'en-espera': 'PENDING'
        };
        
        if (statusMap[estatusMovimiento as keyof typeof statusMap]) {
          filter.status = { eq: statusMap[estatusMovimiento as keyof typeof statusMap] };
        }
      }
      
      // Add date range filter
      if (dateTimeRange?.dates?.from && dateTimeRange?.dates?.to) {
        const fromDate = new Date(dateTimeRange.dates.from);
        const toDate = new Date(dateTimeRange.dates.to);
        
        // Format dates in ISO format
        const fromISO = fromDate.toISOString();
        const toISO = toDate.toISOString();
        
        filter.createdAt = {
          between: [fromISO, toISO]
        };

        console.log('Date range filter:', {
          from: fromISO,
          to: toISO
        });
      }

      console.log('Applied filter:', filter); // Debug log

      // We need to make two queries and combine the results
      const [outboundResponse, inboundResponse] = await Promise.all([
        // First query for movements where user is sender
        client.models.Movement.list({
          filter,
          authMode: 'userPool'
        }),
        // Second query for movements where user is recipient
        client.models.Movement.list({
          filter: {
            and: [
              { direction: { eq: 'INBOUND' } },
              { userId: { eq: username } }
            ]
          },
          authMode: 'apiKey'
        })
      ]);

      console.log('Outbound response:', outboundResponse); // Debug log
      console.log('Inbound response:', inboundResponse);   // Debug log

      // Combine and sort all movements
      const allMovements = [
        ...(outboundResponse.data || []),
        ...(inboundResponse.data || [])
      ].sort((a, b) => {
        return new Date(b?.createdAt ?? 0).getTime() - 
               new Date(a?.createdAt ?? 0).getTime();
      });

      setMovements(allMovements as Movement[]);
    } catch (error) {
      console.error('Error filtering movements:', error);
      setMovements([]);
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
          placeholder="Buscar por beneficiario, concepto o referencia..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full font-clash-display"
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
        onViewDetails={(movement) => setSelectedMovement(movement)}
      />

<TransactionCardDetailModal
        isOpen={!!selectedMovement}
        onClose={() => setSelectedMovement(null)}
        movement={selectedMovement}
      />
    </div>
  )
}