"use client"

import { useEffect, useState } from "react"
import { generateClient } from 'aws-amplify/api'

import { getCurrentUser } from 'aws-amplify/auth'
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MovimientosFilter from "@/components/transferencias/TransaccionesComponent"
import { Transferir } from "@/components/transferencias/transferir"
import {Schema} from "config/amplify/data/resource"
import TransaccionesComponent from "@/components/transferencias/TransaccionesComponent"


export default function TransferenciasPage() {
  const [clabe, setClabe] = useState("")
  const [balance, setBalance] = useState<number>(0)
  const client = generateClient<Schema>()
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { username } = await getCurrentUser();
        const userResult = await client.models.User.get({ 
          id: username,
        }, {
          authMode: 'userPool',
          selectionSet: ['id', 'clabe', 'email', 'balance']
        });
        console.log("User result:", userResult);
        setClabe(userResult.data?.clabe ?? "");
        setBalance(userResult.data?.balance ?? 0);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setClabe("Error loading CLABE");
      }
    }
    fetchUserData();
  }, []);

  const copyToClipboard = async (text: string) => {
    
    try {
      await navigator.clipboard.writeText(text)
      toast.success("CLABE copiada al portapapeles")
    } catch (err) {
      toast.error("Error al copiar CLABE")
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CLABE Card */}
        <Card className="p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-clash-display text-muted-foreground">CLABE</span>
            <div className="flex items-center justify-between">
              <span className="font-clash-display">{clabe || "Loading..."}</span>
              <button 
                onClick={() => copyToClipboard(clabe)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Available Balance Card */}
        <Card className="p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-clash-display text-muted-foreground">Saldo Disponible</span>
            <span className="font-clash-display">
              ${balance.toFixed(2)} MXN
            </span>
          </div>
        </Card>

        {/* Amount on Hold Card */}
        <Card className="p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-clash-display text-muted-foreground">Saldo en espera</span>
            <span className="font-clash-display">$1,234.56 MXN</span>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="movimientos" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger className="font-clash-display" value="movimientos">Movimientos</TabsTrigger>
            <TabsTrigger className="font-clash-display" value="transferir">Transferir</TabsTrigger>
          </TabsList>

          <Select>
            <SelectTrigger className="w-[180px] font-clash-display">
              <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-clash-display" value="2024-03">Marzo 2024</SelectItem>
              <SelectItem className="font-clash-display" value="2024-02">Febrero 2024</SelectItem>
              <SelectItem className="font-clash-display" value="2024-01">Enero 2024</SelectItem>
              <SelectItem className="font-clash-display" value="2023-12">Diciembre 2023</SelectItem>
              <SelectItem className="font-clash-display" value="2023-11">Noviembre 2023</SelectItem>
              <SelectItem className="font-clash-display" value="2023-10">Octubre 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="movimientos">
          <Card className="p-4">
            <h2 className="text-lg font-clash-display mb-4">Movimientos Recientes</h2>
            <TransaccionesComponent />
            {/* Add transactions list here */}
          </Card>
        </TabsContent>

        <TabsContent value="transferir">
          <Card className="p-4">
            <Transferir />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}