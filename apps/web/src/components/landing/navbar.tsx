'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

export function NavbarComponent() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="flex w-full justify-between items-center">
          <div className="md:hidden ml-[-1rem]">
            <Link href="/">
              <Image src="/logotipo.png" alt="FinTech Co. Logo" width={100} height={33} />
            </Link>
          </div>
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image src="/logotipo.png" alt="FinTech Co. Logo" width={120} height={40} />
            </Link>
            <nav className="flex items-center space-x-6 text-lg font-medium">
              <Link className="font-clash-display hover:bg-gray-100 rounded-md px-2 py-1" href="/productos">Productos</Link>
              <Link className="font-clash-display hover:bg-gray-100 rounded-md px-2 py-1" href="/precios">Precios</Link>
              <Link className="font-clash-display hover:bg-gray-100 rounded-md px-2 py-1" href="/contacto">Contacto</Link>
              <Link className="font-clash-display hover:bg-gray-100 rounded-md px-2 py-1" href="/documentacion">Documentación</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[350px] border-0">
                <div className="flex items-center justify-center w-full">
                  <Link href="/">
                    <Image src="/logo-cedi.PNG" alt="logo-cedi" width={100} height={33} />
                  </Link>
                </div>
                <div className="px-6">
                  <div className="flex flex-col space-y-4 mt-4">
                    <MobileLink 
                      href="/productos" 
                      onOpenChange={() => {}}
                      className="text-lg font-clash-display"
                    >
                      Productos
                    </MobileLink>
                    <MobileLink 
                      href="/precios" 
                      onOpenChange={() => {}}
                      className="text-lg font-clash-display"
                    >
                      Precios
                    </MobileLink>
                    <MobileLink 
                      href="/contacto" 
                      onOpenChange={() => {}}
                      className="text-lg font-clash-display"
                    >
                      Contacto
                    </MobileLink>
                    <MobileLink 
                      href="/documentacion" 
                      onOpenChange={() => {}}
                      className="text-lg font-clash-display"
                    >
                      Documentación
                    </MobileLink>
                    <div className="flex flex-col gap-3 pt-6">
                      <Link href="/login">
                        <Button className="w-full bg-cedi-beige text-cedi-black hover:bg-cedi-light-gray text-lg font-clash-display">
                          Ingresa
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button className="w-full bg-cedi-black text-white hover:bg-cedi-dark-gray text-lg font-clash-display">
                          Crear cuenta
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <Button className="bg-cedi-beige text-cedi-black hover:bg-cedi-light-gray text-lg font-clash-display">Ingresa</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-cedi-black text-white hover:bg-cedi-dark-gray text-lg font-clash-display">Crear cuenta</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

interface MobileLinkProps {
  href: string
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}