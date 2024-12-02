import Image from 'next/image'
import { LoginForm } from '@/components/auth/login-form'
import { DashboardPreview } from '@/components/auth/dashboard-preview'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col-reverse md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full min-h-screen md:min-h-0 md:w-1/2 bg-cedi-white p-6 sm:p-8 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-[400px] mx-auto py-6 md:py-0">
          <div className="mb-6 sm:mb-8">
            <Image 
              src="/logotipo.png" 
              alt="cedi logo" 
              width={120}
              height={40}
              className="w-[120px] sm:w-[150px]"
            />
            <h1 className="text-2xl sm:text-3xl font-clash-display font-bold mt-4 sm:mt-6 mb-2">
              Bienvenid@ de vuelta
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-clash-display">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right side - Dashboard Preview - Hidden on mobile */}
      <div className="hidden md:block w-full md:w-1/2 bg-cedi-beige relative">
        <DashboardPreview />
      </div>
    </div>
  )
}