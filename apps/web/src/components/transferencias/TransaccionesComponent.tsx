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
import { IconEye, IconDownload } from "@tabler/icons-react"
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
  concept2?: string;
  createdAt?: string;
}

export default function MovimientosFilter() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, tipoMovimiento, estatusMovimiento, dateTimeRange]);

  // Calculate paginated movements
  const totalPages = Math.ceil(movements.length / ITEMS_PER_PAGE);
  const paginatedMovements = movements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilter = async () => {
    try {
      setLoading(true);
      const { username } = await getCurrentUser();
      const client = generateClient<Schema>();
      
      // Create base filters for both queries
      let baseFilter: any = {};
      
      // Add search filter if there's a search term
      if (search.trim()) {
        baseFilter.or = [
          { counterpartyName: { contains: search.toLowerCase() } },
          { concept: { contains: search.toLowerCase() } },
          { trackingId: { contains: search } },
          { internalReference: { contains: search } },
          { externalReference: { contains: search } }
        ];
      }
      
      // Add movement type filter
      if (tipoMovimiento !== 'todo') {
        const typeFilters = {
          'deposito': { direction: { eq: 'INBOUND' } },
          'retiro': { direction: { eq: 'OUTBOUND' } },
          'mensualidad': { category: { eq: 'INTERNAL' } }
        };
        
        if (typeFilters[tipoMovimiento as keyof typeof typeFilters]) {
          baseFilter = {
            ...baseFilter,
            ...typeFilters[tipoMovimiento as keyof typeof typeFilters]
          };
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
          baseFilter.status = { eq: statusMap[estatusMovimiento as keyof typeof statusMap] };
        }
      }
      
      // Add date range filter
      if (dateTimeRange?.dates?.from && dateTimeRange?.dates?.to) {
        const fromDate = new Date(dateTimeRange.dates.from);
        const toDate = new Date(dateTimeRange.dates.to);
        
        // Set time to start and end of day respectively
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        
        baseFilter.createdAt = {
          between: [fromDate.toISOString(), toDate.toISOString()]
        };
      }

      // Create outbound and inbound filters
      const outboundFilter = {
        and: [
          { userId: { eq: username } },
          ...Object.keys(baseFilter).length > 0 ? [baseFilter] : []
        ]
      };

      const inboundFilter = {
        and: [
          { userId: { eq: username } },
          { direction: { eq: 'INBOUND' } },
          ...Object.keys(baseFilter).length > 0 ? [baseFilter] : []
        ]
      };

      console.log('Outbound filter:', outboundFilter);
      console.log('Inbound filter:', inboundFilter);

      const [outboundResponse, inboundResponse] = await Promise.all([
        client.models.Movement.list({
          filter: outboundFilter,
          authMode: 'userPool'
        }),
        client.models.Movement.list({
          filter: inboundFilter,
          authMode: 'apiKey'
        })
      ]);

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

  const downloadCSV = () => {
    // Define CSV headers
    const headers = [
      'Fecha',
      'Tipo',
      'Estatus',
      'Referencia',
      'Concepto',
      'Beneficiario/Remitente',
      'Banco',
      'Monto',
      'Comisión',
      'Monto Final'
    ];

    // Convert movements to CSV format
    const csvData = movements.map(movement => [
      movement.createdAt ? new Date(movement.createdAt).toLocaleString() : '-',
      getTypeLabel(movement.category, movement.direction),
      getStatusLabel(movement.status),
      movement.externalReference || movement.internalReference || movement.trackingId || '-',
      movement.concept || '-',
      movement.counterpartyName,
      movement.counterpartyBank,
      movement.amount.toFixed(2),
      movement.commission.toFixed(2),
      movement.finalAmount.toFixed(2)
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `movimientos_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper functions for CSV
  const getTypeLabel = (category: string, direction: string) => {
    if (category === 'WIRE') {
      return direction === 'INBOUND' ? 'Depósito' : 'Retiro';
    }
    return category === 'INTERNAL' ? 'Mensualidad' : '-';
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'En espera',
      'PROCESSING': 'Procesando',
      'COMPLETED': 'Liquidado',
      'FAILED': 'Cancelado',
      'REVERSED': 'Devuelto'
    };
    return statusMap[status] || status;
  };

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
          <Button 
            onClick={downloadCSV} 
            variant="outline"
            className="font-clash-display"
            disabled={movements.length === 0}
          >
            <IconDownload className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>
      <TransaccionesTable 
        movements={paginatedMovements} 
        loading={loading}
        error={error}
        onViewDetails={(movement) => setSelectedMovement(movement)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />

<TransactionCardDetailModal
        isOpen={!!selectedMovement}
        onClose={() => setSelectedMovement(null)}
        movement={selectedMovement}
      />
    </div>
  )
}