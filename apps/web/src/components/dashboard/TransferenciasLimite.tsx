"use client"
import { useState, useEffect } from "react"
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import { type Schema } from 'config/amplify/data/resource'
import { Skeleton } from "@/components/ui/skeleton"

interface TransferenciasLimiteProps {
  className?: string;
}

export function TransferenciasLimite({ className }: TransferenciasLimiteProps) {
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState(0);
  const [loading, setLoading] = useState(true);
  const client = generateClient<Schema>();
  const LIMITE = 3000000;

  useEffect(() => {
    async function fetchDeposits() {
      try {
        const { username } = await getCurrentUser();
        const deposits = await client.models.Movement.list({
          authMode: 'userPool',
          selectionSet: ['id', 'amount', 'finalAmount', 'direction', 'status', 'category']
        });

        console.log('All movements:', deposits.data);
        console.log('Current user:', username);

        const totalDeposits = deposits.data?.reduce((total, deposit) => {
          console.log('Processing deposit:', deposit);
          return total + (deposit.amount || 0);
        }, 0) || 0;

        console.log('Total deposits:', totalDeposits);
        setTransferenciasRecibidas(totalDeposits);
      } catch (err) {
        console.error("Error fetching deposits:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeposits();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full ${className}`}>
        <Skeleton className="h-4 w-24 mb-4" />
        <div className="mb-4">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
      </div>
    );
  }

  const progress = (transferenciasRecibidas / LIMITE) * 100;

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full ${className}`}>
      <h2 className="text-sm font-clash-display text-gray-600 dark:text-gray-400 mb-4">
        Transferencias
      </h2>
      
      <div className="mb-4">
        <p className="text-sm font-clash-display text-gray-600 dark:text-gray-400">
          Transferencias recibidas
        </p>
        <p className="text-2xl font-clash-display text-gray-900 dark:text-white">
          ${transferenciasRecibidas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div>
        <div className="flex justify-between font-clash-display text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Límite</span>
          <span>${LIMITE.toLocaleString('es-MX')}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}