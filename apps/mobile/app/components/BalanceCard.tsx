import { colors } from '@/app/constants/colors';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource"
import { Skeleton } from './Skeleton';

export function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBalance();
  }, []);

  // Format the balance with commas and two decimal places
  const formattedBalance = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(balance);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Balance disponible</Text>
      {isLoading ? (
        <Skeleton width={200} height={38} />
      ) : (
        <Text style={styles.balance}>${formattedBalance}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
  },
  balance: {
    fontFamily: 'ClashDisplay',
    fontSize: 32,
    color: colors.black,
  },
});