"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from 'aws-amplify/auth'
import { BankingSidebar } from "@/components/components-banking-sidebar"
import { useToast } from "@/hooks/use-toast"

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
    return <div>Cargando...</div> // You can replace this with a proper loading component
  }

  return <BankingSidebar>{children}</BankingSidebar>
}