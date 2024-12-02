"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { IconSend } from "@tabler/icons-react"

export function SingleCardFunding() {
  const [amount, setAmount] = useState("")
  const [selectedCard, setSelectedCard] = useState("")
  const commission = 0.039 // 3.9%
  
  const calculatedCommission = amount ? Number(amount) * commission : 0
  const totalAmount = amount ? Number(amount) + calculatedCommission : 0
  const availableBalance = 5240.50 // WIP connect to API
  const remainingBalance = availableBalance - totalAmount

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="card" className="font-clash-display">Selecciona una tarjeta</Label>
          <Select value={selectedCard} onValueChange={setSelectedCard}>
            <SelectTrigger id="card">
              <SelectValue className="font-clash-display" placeholder="Selecciona una tarjeta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card1">**** **** **** 1234 - Débito</SelectItem>
              <SelectItem value="card2">**** **** **** 5678 - Crédito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="font-clash-display">Monto a depositar</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-clash-display text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-clash-display">Comisión (3.9%)</span>
            <span className="font-clash-display">${calculatedCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-clash-display">Total a pagar</span>
            <span className="font-clash-display">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-muted-foreground font-clash-display">Saldo restante</span>
            <span className={`font-clash-display ${remainingBalance < 0 ? 'text-red-500' : 'text-green-500'}`}>
              ${remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          className="flex items-center gap-2 font-clash-display"
          disabled={!selectedCard || !amount || remainingBalance < 0}
          onClick={() => {
            // WIP connect to API
            console.log('Processing transfer:', { selectedCard, amount, totalAmount })
          }}
        >
          <IconSend size={18} />
          Realizar depósito
        </Button>
      </div>
    </div>
  )
}