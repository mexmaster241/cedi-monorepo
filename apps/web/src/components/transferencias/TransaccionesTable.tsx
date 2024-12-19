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
import { Button } from "@/components/ui/button"
import { IconEye } from "@tabler/icons-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Movement {
  id: string;
  category: string;      // 'WIRE' | 'INTERNAL'
  direction: string;     // 'INBOUND' | 'OUTBOUND'
  status: string;        // 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REVERSED'
  amount: number;
  commission: number;
  finalAmount: number;
  claveRastreo: string;
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

interface TransaccionesTableProps {
  movements: Movement[];
  loading: boolean;
  error: string | null;
  onViewDetails: (movement: Movement) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export function TransaccionesTable({ 
  movements, 
  loading, 
  error, 
  onViewDetails,
  currentPage,
  onPageChange,
  totalPages,
}: TransaccionesTableProps) {
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
    return movement.externalReference || movement.internalReference || movement.claveRastreo || '-';
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-clash-display">Fecha</TableHead>
            <TableHead className="text-center font-clash-display">Tipo</TableHead>
            <TableHead className="text-center font-clash-display">Estatus</TableHead>
            <TableHead className="text-center font-clash-display">Referencia</TableHead>
            <TableHead className="text-center font-clash-display">Concepto</TableHead>
            {/* <TableHead className="text-center font-clash-display">Concepto 2</TableHead> */}
            <TableHead className="text-center font-clash-display">Beneficiario/Remitente</TableHead>
            <TableHead className="text-center font-clash-display">Banco</TableHead>
            <TableHead className="text-center font-clash-display">Monto</TableHead>
            <TableHead className="text-center font-clash-display">Comisión</TableHead>
            <TableHead className="text-center font-clash-display">Monto Final</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center font-clash-display">
                No hay transacciones disponibles
              </TableCell>
            </TableRow>
          ) : (
            movements.map((movement) => (
              <TableRow key={movement?.id}>
                <TableCell className="text-center font-clash-display">
                  {movement?.createdAt ? new Date(movement.createdAt).toLocaleString() : '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  {movement ? getTypeLabel(movement.category, movement.direction) : '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  {movement?.status ? getStatusLabel(movement.status) : '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  {movement ? getReference(movement) : '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  {movement?.concept || '-'}
                </TableCell>
                {/* <TableCell className="text-center font-clash-display">
                  {movement.concept2}
                </TableCell> */}
                <TableCell className="text-center font-clash-display">
                  {movement?.counterpartyName || '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  {movement?.counterpartyBank || '-'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  ${movement?.amount?.toFixed(2) || '0.00'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  ${movement?.commission?.toFixed(2) || '0.00'}
                </TableCell>
                <TableCell className="text-center font-clash-display">
                  ${movement?.finalAmount?.toFixed(2) || '0.00'}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(movement)}
                  >
                    <IconEye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {movements.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
