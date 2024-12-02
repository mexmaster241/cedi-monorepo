"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { MovimientosTab } from "@/components/tarjetas/movimientos-tab"
import { TarjetasTab } from "@/components/tarjetas/tarjetas-tab"

export default function TarjetasPage() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <h1 className="text-2xl font-bold tracking-tight font-clash-display">Tarjetas</h1>
      
      
      <Tabs defaultValue="movimientos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="movimientos" className="font-clash-display">
            Movimientos
          </TabsTrigger>
          <TabsTrigger value="tarjetas" className="font-clash-display">
            Tarjetas de Crédito
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="movimientos">
          <Card className="max-w-[1100px] mx-auto">
            <CardContent className="pt-6">
              <MovimientosTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tarjetas">
          <Card>
            <CardContent className="pt-6 overflow-x-hidden">
              <TarjetasTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}