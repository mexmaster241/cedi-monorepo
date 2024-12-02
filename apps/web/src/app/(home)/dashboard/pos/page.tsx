"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionsTab } from "@/components/pos/TransactionsTab"

export default function POSPage() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <h1 className="text-2xl font-bold tracking-tight font-clash-display">POS</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-clash-display">Total Bruto</span>
              <span className="text-2xl font-bold font-clash-display">$45,231.89</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-clash-display">Total Neto</span>
              <span className="text-2xl font-bold font-clash-display">$43,891.23</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-clash-display">Transacciones Aprobadas</span>
              <span className="text-2xl font-bold font-clash-display">1,234</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions" className="font-clash-display">
            Transacciones
          </TabsTrigger>
          <TabsTrigger value="micomercio" className="font-clash-display">
            Mi Comercio
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card className="max-w-[1100px] mx-auto">
            <CardContent className="pt-6">
              <TransactionsTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="micomercio">
          <Card>
            <CardContent className="pt-6 overflow-x-hidden">
            
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}