import Link from 'next/link'
import { CreditCard } from '@/components/credit-card'

export default function Hero() {
  return (
    <div className="container mx-auto min-h-[90vh]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-16 sm:pb-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between min-h-[500px] lg:h-[800px]">
          {/* Left side - Text Content */}
          <div className="max-w-2xl pt-8 lg:pt-20">
            <h1 className="text-4xl sm:text-5xl font-clash-display tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-9xl">
              Centraliza tu dinero  
            </h1>
            
            <p className="mt-4 sm:mt-8 text-lg sm:text-xl font-clash-display text-gray-600 dark:text-gray-300 lg:text-2xl">
              Con cedi puedes centralizar tu dinero en un solo lugar y tener un mejor control de las finanzas de tu empresa.
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="rounded-md bg-cedi-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-clash-display text-white shadow-sm hover:bg-cedi-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-center"
              >
                Comienza
              </Link>
              
              <Link 
                href="/learn-more"
                className="rounded-md border border-cedi-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-clash-display text-cedi-black shadow-sm hover:bg-cedi-black/10 dark:hover:bg-gray-800 text-center"
              >
                Pónte en contacto
              </Link>
            </div>
          </div>

          {/* Right side - Credit Card */}
          <div className="relative mt-12 lg:mt-0 lg:block h-[300px] lg:h-full">
            <div className="absolute left-1/2 lg:right-[-20%] lg:left-auto top-1/2 lg:top-1/3 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-[280px] sm:w-[350px] lg:w-[450px]">
              <div className="transform transition-all duration-500 ease-out
                hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                group cursor-pointer motion-safe:animate-float"
              >
                <CreditCard />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cedi-beige/50" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-cedi-beige/50" />
          </div>
        </div>
      </div>
    </div>
  )
}