import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'

export default function HeroProductos() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="max-w-2xl mx-auto -mt-64">
          <h1 className="text-5xl font-clash-display tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-8">
            Nuestros Productos
          </h1>
          <p className="text-xl font-clash-display text-gray-600 dark:text-gray-300 lg:text-2xl">
            Descubre todas las soluciones financieras que tenemos para tu empresa
          </p>
        </div>
      }
    >
      <div className="h-full w-full flex items-center justify-center">
        <Image
          src="/dashboard.png"
          alt="Dashboard"
          width={1200}
          height={800}
          className="object-cover rounded-lg"
        />
      </div>
    </ContainerScroll>
  )
}