"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface Movement {
  id: string;
  category: string;      // 'WIRE' | 'INTERNAL'
  direction: string;     // 'INBOUND' | 'OUTBOUND'
  status: string;        // 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REVERSED'
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

interface TransaccionesTableProps {
  movements: Movement[];
  loading: boolean;
  error?: string | null;
}

export function TransaccionesTable({ movements, loading, error }: TransaccionesTableProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

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

  const getReference = (movement: Movement) => {
    return movement.externalReference || movement.internalReference || movement.trackingId || '-';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-clash-display">Fecha</TableHead>
          <TableHead className="text-center font-clash-display">Tipo</TableHead>
          <TableHead className="text-center font-clash-display">Estatus</TableHead>
          <TableHead className="text-center font-clash-display">Referencia</TableHead>
          <TableHead className="text-center font-clash-display">Beneficiario/Remitente</TableHead>
          <TableHead className="text-center font-clash-display">Banco</TableHead>
          <TableHead className="text-center font-clash-display">Monto</TableHead>
          <TableHead className="text-center font-clash-display">Comisión</TableHead>
          <TableHead className="text-center font-clash-display">Monto Final</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center font-clash-display">
              No hay transacciones disponibles
            </TableCell>
          </TableRow>
        ) : (
          movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>
                {movement.createdAt ? new Date(movement.createdAt).toLocaleString() : '-'}
              </TableCell>
              <TableCell>
                {getTypeLabel(movement.category, movement.direction)}
              </TableCell>
              <TableCell>{getStatusLabel(movement.status)}</TableCell>
              <TableCell>{getReference(movement)}</TableCell>
              <TableCell>{movement.counterpartyName}</TableCell>
              <TableCell>{movement.counterpartyBank}</TableCell>
              <TableCell>${movement.amount.toFixed(2)}</TableCell>
              <TableCell>${movement.commission.toFixed(2)}</TableCell>
              <TableCell>${movement.finalAmount.toFixed(2)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
