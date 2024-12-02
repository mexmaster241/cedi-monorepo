import { IconArrowRight, IconBuildingBank, IconCreditCard, IconUsers, IconWallet } from '@tabler/icons-react'
import Image from 'next/image'

export default function MoneyDispersionCard() {
  return (
    <div className="w-full space-y-6 p-4">
      {/* Amount to Disperse */}
      <div className="bg-cedi-black p-6 rounded-xl text-white">
        <p className="text-sm font-clash-display opacity-80 mb-2">Monto a dispersar</p>
        <h3 className="text-3xl font-clash-display">$45,750.00 MXN</h3>
        <div className="flex items-center gap-2 mt-2 text-sm font-clash-display opacity-80">
          <IconUsers className="w-4 h-4" />
          <span>25 destinatarios</span>
        </div>
      </div>

      {/* Dispersion Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-clash-display">Progreso de dispersión</span>
          <span className="font-clash-display">80%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>

      {/* Recipients List */}
      <div className="space-y-3">
        <h4 className="font-clash-display text-sm">Destinatarios Recientes</h4>
        
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <IconCreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-clash-display text-sm">Juan Pérez</p>
              <p className="text-xs font-clash-display text-gray-500">Tarjeta terminación *4589</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-clash-display">$2,500</span>
            <IconArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <IconBuildingBank className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-clash-display text-sm">María González</p>
              <p className="text-xs font-clash-display text-gray-500">Cuenta CLABE ****1234</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-clash-display">$1,800</span>
            <IconArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <IconWallet className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-clash-display text-sm">Carlos Ruiz</p>
              <p className="text-xs font-clash-display text-gray-500">Monedero digital</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-clash-display">$3,200</span>
            <IconArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm font-clash-display text-blue-600 mb-1">Dispersiones Exitosas</p>
          <p className="text-2xl font-clash-display text-blue-700">20/25</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-sm font-clash-display text-green-600 mb-1">Tiempo Promedio</p>
          <p className="text-2xl font-clash-display text-green-700">1.5s</p>
        </div>
      </div>
    </div>
  )
}