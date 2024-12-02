import { Metadata } from 'next'
import { IconCheck, IconCreditCard, IconBuildingSkyscraper } from '@tabler/icons-react'
import Link from 'next/link'
import { FeaturesPrecios } from '@/components/precios/features-precios'

export const metadata: Metadata = {
  title: 'Precios | CEDI',
  description: 'Conoce nuestros planes y precios para encontrar la solución perfecta para tu empresa.',
}

export default function PreciosPage() {
  return (
    <div className="bg-cedi-beige">
      <div className="container mx-auto px-4 py-12 sm:py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-clash-display tracking-tight text-gray-900 dark:text-white text-center mb-8 sm:mb-16">
          Planes y Precios
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* POS Pricing Card */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:bg-black dark:border-gray-800 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-cedi-black dark:bg-blue-900/30 p-2 sm:p-3 rounded-lg">
                <IconCreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-cedi-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-clash-display">Punto de Venta</h2>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-clash-display">3.6%</span>
                <span className="text-gray-600 font-clash-display dark:text-gray-400">+ $5 MXN</span>
              </div>
              <p className="text-gray-600 font-clash-display dark:text-gray-400 mt-2 text-sm sm:text-base">
                por transacción
              </p>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-2 sm:gap-3 text-gray-600 font-clash-display dark:text-gray-300 text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                Terminal virtual incluida
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-600 font-clash-display dark:text-gray-300 text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                Acepta todas las tarjetas
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-600 font-clash-display dark:text-gray-300 text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                Pagos con código QR
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-600 font-clash-display dark:text-gray-300 text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                Soporte 24/7
              </li>
            </ul>

            <Link 
              href="/sign-up"
              className="block w-full text-center bg-cedi-black hover:bg-cedi-black/80 text-cedi-white rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-clash-display transition-colors"
            >
              Comenzar ahora
            </Link>
          </div>

          {/* Enterprise Card */}
          <div className="rounded-2xl border border-gray-200 bg-cedi-black p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow text-white">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-cedi-white p-2 sm:p-3 rounded-lg backdrop-blur-sm">
                <IconBuildingSkyscraper className="w-5 h-5 sm:w-6 sm:h-6 text-cedi-black" />
              </div>
              <h2 className="text-xl sm:text-2xl font-clash-display">Enterprise</h2>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-clash-display">Personalizado</span>
              </div>
              <p className="text-gray-300 font-clash-display mt-2 text-sm sm:text-base">
                para grandes volúmenes
              </p>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-2 sm:gap-3 text-gray-300 font-clash-display text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                Tarifas personalizadas
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-300 font-clash-display text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                API dedicada
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-300 font-clash-display text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                Gerente de cuenta dedicado
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-300 font-clash-display text-sm sm:text-base">
                <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                SLA personalizado
              </li>
            </ul>

            <Link 
              href="/contacto"
              className="block w-full text-center bg-white text-cedi-black hover:bg-cedi-beige rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-clash-display transition-colors"
            >
              Contactar ventas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}