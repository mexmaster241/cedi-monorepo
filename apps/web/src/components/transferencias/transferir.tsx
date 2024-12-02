"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransferirForm } from "./TransferirForm"
import { DispersionTab } from "./dispersion"

export function Transferir() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="transferir" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger className="font-clash-display" value="transferir">
            Transferir
          </TabsTrigger>
          <TabsTrigger className="font-clash-display" value="codi">
            Generar código CoDi
          </TabsTrigger>
          <TabsTrigger className="font-clash-display" value="dispersion">
            Dispersión
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transferir">
          <Card className="p-6">
            <h2 className="text-lg font-clash-display mb-4">Transferir a contacto</h2>
            <TransferirForm />
          </Card>
        </TabsContent>

        <TabsContent value="codi">
          <Card className="p-6">
            <h2 className="text-lg font-clash-display mb-4">Generar código CoDi</h2>
          
          </Card>
        </TabsContent>

        <TabsContent value="dispersion">
          <Card className="p-6">
            <h2 className="text-lg font-clash-display mb-4">Dispersión de pagos</h2>
            <DispersionTab />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
