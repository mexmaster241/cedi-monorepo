"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from 'aws-amplify/auth'
import { BankingSidebar } from "@/components/components-banking-sidebar"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import { Amplify } from 'aws-amplify'
import { amplifyConfig } from 'config'
import { Toaster } from "@/components/ui/toaster";
import { SessionWarning } from "@/components/context/session-warning";

Amplify.configure(amplifyConfig)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser()
        setIsLoading(false)
      } catch (error) {
        toast({
          title: "Sesión no válida",
          description: "Por favor inicia sesión para continuar",
          variant: "destructive",
        })
        router.push('/login')
      }
    }

    checkAuth()
  }, [router, toast])

  if (isLoading) {
    return <div className='animate-spin mb-4'>
    <Image src="/logotipo-white.png" alt="Logo de Cedis" width={24} height={24} />   
    </div>
  }

  return (
    <>
      <BankingSidebar>{children}</BankingSidebar>
      <SessionWarning />
      <Toaster />
    </>
  )
}
