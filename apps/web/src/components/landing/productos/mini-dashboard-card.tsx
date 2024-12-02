import { IconArrowUpRight, IconBuildingBank, IconCash, IconCreditCard, IconReceipt, IconUsers } from '@tabler/icons-react'

export default function MiniDashboardCard() {
  return (
    <div className="w-full space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <IconCash className="w-4 h-4" />
            <span className="font-clash-display">Ingresos</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">$45,231</span>
            <div className="flex items-center text-green-500 text-sm">
              <IconArrowUpRight className="w-4 h-4" />
              <span>12%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <IconCreditCard className="w-4 h-4" />
            <span className="font-clash-display">Gastos</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">$12,875</span>
            <div className="flex items-center text-red-500 text-sm">
              <IconArrowUpRight className="w-4 h-4" />
              <span>8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-gray-50 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <IconBuildingBank className="w-4 h-4 text-blue-500" />
            <span className="font-clash-display">Transferencia Bancaria</span>
          </div>
          <span className="font-medium">$2,400</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <IconReceipt className="w-4 h-4 text-purple-500" />
            <span className="font-clash-display">Pago de Factura</span>
          </div>
          <span className="font-medium">$1,250</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <IconUsers className="w-4 h-4 text-orange-500" />
            <span className="font-clash-display">Nómina</span>
          </div>
          <span className="font-medium">$8,750</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button className="p-2 bg-blue-50 rounded-lg text-blue-600 text-xs font-clash-display hover:bg-blue-100 transition-colors">
          Transferir
        </button>
        <button className="p-2 bg-purple-50 rounded-lg text-purple-600 text-xs font-clash-display hover:bg-purple-100 transition-colors">
          Pagar
        </button>
        <button className="p-2 bg-orange-50 rounded-lg text-orange-600 text-xs font-clash-display hover:bg-orange-100 transition-colors">
          Reportes
        </button>
      </div>
    </div>
  )
}