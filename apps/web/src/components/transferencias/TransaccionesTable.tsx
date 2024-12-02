import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TransaccionesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estatus</TableHead>
          <TableHead>Tipo de pago</TableHead>
          <TableHead>Referencia</TableHead>
          <TableHead>Concepto</TableHead>
          <TableHead>Concepto 2</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Comisión</TableHead>
          <TableHead>Depósito final</TableHead>
          <TableHead>Movimiento en la cuenta</TableHead>
          <TableHead>Saldo</TableHead>
          <TableHead>Comprobante</TableHead>
          <TableHead>Detalles</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Table rows will go here */}
      </TableBody>
    </Table>
  )
}
