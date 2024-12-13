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

interface TransaccionesTableProps {
  transactions: Array<{
    id: string;
    type: string;
    status: string;
    amount: number;
    commission: number;
    finalAmount: number;
    reference: string | null;
    beneficiaryName: string | null;
    createdAt: string | null;
  }>;
  loading: boolean;
}

export function TransaccionesTable({ transactions, loading }: TransaccionesTableProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estatus</TableHead>
          <TableHead>Referencia</TableHead>
          <TableHead>Beneficiario</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Comisión</TableHead>
          <TableHead>Monto Final</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No hay transacciones disponibles
            </TableCell>
          </TableRow>
        ) : (
          transactions?.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : '-'}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{tx.reference || '-'}</TableCell>
              <TableCell>{tx.beneficiaryName || '-'}</TableCell>
              <TableCell>${tx.amount.toFixed(2)}</TableCell>
              <TableCell>${tx.commission.toFixed(2)}</TableCell>
              <TableCell>${tx.finalAmount.toFixed(2)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
