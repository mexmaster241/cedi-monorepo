import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  export function TransactionsTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo de transacción</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead>Código de autorización</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Tarjeta</TableHead>
            <TableHead>Banco</TableHead>
            <TableHead>Tasa</TableHead>
            <TableHead>Venta</TableHead>
            <TableHead>Propina</TableHead>
            <TableHead>Monto Total</TableHead>
            <TableHead>Comisión</TableHead>
            <TableHead>Depósito</TableHead>
            <TableHead>Voucher</TableHead>
            <TableHead>Documentos</TableHead>
            <TableHead>Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Table rows will go here */}
        </TableBody>
      </Table>
    )
  }