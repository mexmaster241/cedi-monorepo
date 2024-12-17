"use client"
import { useState, useEffect } from "react"
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import { type Schema } from 'config/amplify/data/resource'
import { Skeleton } from "@/components/ui/skeleton"

interface BalanceCardProps {
  className?: string;
}

export function BalanceCard({ className }: BalanceCardProps) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    async function fetchBalance() {
      try {
        const { username } = await getCurrentUser();
        const userResult = await client.models.User.get({ 
          id: username,
        }, {
          authMode: 'userPool',
          selectionSet: ['id', 'balance']
        });
        
        setBalance(userResult.data?.balance ?? 0);
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full ${className}`}>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-8 w-32" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full ${className}`}>
      <h2 className="text-sm font-clash-display text-gray-600 dark:text-gray-400">Balance</h2>
      <p className="text-3xl font-bold font-clash-display text-gray-900 dark:text-white">
        ${balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}
