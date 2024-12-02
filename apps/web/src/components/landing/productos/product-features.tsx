import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import MiniDashboardCard from './mini-dashboard-card'
import MiniPOSCard from './mini-pos-card'
import MoneyDispersionCard from './money-dispersion-card'

export default function ProductFeatures() {
  return (
    <div className="container mx-auto -mt-64 px-4 py-24">
      <h2 className="text-7xl font-clash-display text-left mb-16 text-gray-900 dark:text-white">
        Soluciones para cada necesidad
      </h2>

      {/* First Product - Card Left */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
        <div className="w-full md:w-1/2">
          <CardContainer className="inter-var">
            <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-clash-display text-neutral-600 dark:text-white"
              >
                Dashboard
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <MiniDashboardCard />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-clash-display text-gray-900 dark:text-white">
            Control Financiero
          </h3>
          <p className="text-xl text-gray-600 font-clash-display dark:text-gray-300">
            Gestiona las operaciones financieras de tu empresa con nuestro dashboard, centraliza tus datos y accede a ellos desde cualquier lugar.
          </p>
          <Link 
            href="/contacto"
            className="inline-block rounded-md bg-cedi-black px-8 py-4 text-lg font-clash-display text-white shadow-sm hover:bg-cedi-black/90"
          >
            Solicitar ahora
          </Link>
        </div>
      </div>

      {/* Second Product - Card Right */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-32">
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-clash-display text-gray-900 dark:text-white">
            Cobros y Pagos
          </h3>
          <p className="text-xl font-clash-display text-gray-600 dark:text-gray-300">
            Sistema de punto de venta intuitivo y fácil de usar. Acepta múltiples métodos de pago y genera reportes en tiempo real.
          </p>
          <Link 
            href="/contacto"
            className="inline-block rounded-md bg-cedi-black px-8 py-4 text-lg font-clash-display text-white shadow-sm hover:bg-cedi-black/90"
          >
            Conocer más
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <CardContainer className="inter-var">
            <CardBody className="bg-cedi-beige relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-clash-display text-neutral-600 dark:text-white"
              >
                Punto de Venta
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <MiniPOSCard />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>

      {/* Third Product - Card Left */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <CardContainer className="inter-var">
            <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-clash-display text-neutral-600 dark:text-white"
              >
                Dispersión de Pagos
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <MoneyDispersionCard />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-clash-display text-gray-900 dark:text-white">
            Dispersión de Pagos
          </h3>
          <p className="text-xl font-clash-display text-gray-600 dark:text-gray-300">
            Distribuye pagos de forma masiva a múltiples destinatarios. Ideal para nóminas, pagos a proveedores y más.
          </p>
          <Link 
            href="/contacto"
            className="inline-block rounded-md bg-cedi-black px-8 py-4 text-lg font-clash-display text-white shadow-sm hover:bg-cedi-black/90"
          >
            Empezar ahora
          </Link>
        </div>
      </div>
    </div>
  )
}