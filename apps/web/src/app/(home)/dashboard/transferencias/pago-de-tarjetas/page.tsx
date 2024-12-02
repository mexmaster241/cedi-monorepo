"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { DispersionTab } from "@/components/transferencias/dispersion"
import { SingleCardFunding } from "@/components/transferencias/single-card-funding"

export default function PagoDeTarjetaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <Image
            src="/logo-cedi.PNG"
            alt="Cedi Logo"
            width={120}
            height={40}
            className="mb-6"
          />
          
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold font-clash-display">¡Hola, Bienvenido!</h1>
            <p className="text-muted-foreground font-clash-display">
              Desde este módulo, podrás fondear tu(s) tarjeta(s). Ten en cuenta que solo utilizarás
              el monto que tienes en tu cuenta.
            </p>
            <p className="text-sm text-muted-foreground font-clash-display">
              Este servicio solo esta disponible si cuentas con tarjeta Cedi.
            </p>
          </div>
        </div>

        {/* Right Section - Account Balance Card */}
        <div className="md:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-clash-display">Cuenta Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-clash-display">Saldo disponible</span>
                  <span className="text-2xl font-semibold font-clash-display">$5,240.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-clash-display">Número de cuenta</span>
                  <span className="font-medium font-clash-display">**** **** **** 1234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="single" className="w-full mt-6">
        
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single" className="font-clash-display">Una Tarjeta</TabsTrigger>
          <TabsTrigger value="multiple" className="font-clash-display">Dispersión Masiva</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <Card>
            <CardContent className="pt-6">
              {/* Single card funding form will go here */}
              <SingleCardFunding />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multiple">
          <Card>
            <CardContent className="pt-6">
              <DispersionTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}