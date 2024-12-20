import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource";
import { Skeleton } from './Skeleton';

interface Movement {
  id: string;
  category: string;      
  direction: string;     
  status: string;        
  amount: number;
  counterpartyName: string;
  concept?: string;
  createdAt?: string;
}

export function Transactions() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    let isMounted = true;

    async function fetchMovements() {
      try {
        const { username } = await getCurrentUser();
        const [outboundResponse, inboundResponse] = await Promise.all([
          client.models.Movement.list({
            filter: { userId: { eq: username } },
            authMode: 'userPool'
          }),
          client.models.Movement.list({
            filter: { 
              and: [
                { userId: { eq: username } },
                { direction: { eq: 'INBOUND' } }
              ]
            },
            authMode: 'apiKey'
          })
        ]);

        if (isMounted) {
          const allMovements = [
            ...(outboundResponse.data || []),
            ...(inboundResponse.data || [])
          ].sort((a, b) => {
            return new Date(b?.createdAt ?? 0).getTime() - 
                   new Date(a?.createdAt ?? 0).getTime();
          });

          setMovements(allMovements.slice(0, 20) as Movement[]); // Show last 20 movements
        }
      } catch (err) {
        console.error('Error fetching movements:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMovements();
    return () => { isMounted = false; };
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-MX');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transacciones recientes</Text>
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <View key={index} style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Skeleton width={150} height={20} />
              <View style={{ marginTop: 4 }}>
                <Skeleton width={100} height={16} />
              </View>
              <View style={{ marginTop: 4 }}>
                <Skeleton width={120} height={16} />
              </View>
            </View>
            <Skeleton width={80} height={20} />
          </View>
        ))
      ) : (
        <FlatList
          data={movements}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {item.direction === 'INBOUND' ? 'Depósito de ' : 'Retiro a '}
                  {item.counterpartyName}
                </Text>
                {item.concept && (
                  <Text style={styles.concept}>{item.concept}</Text>
                )}
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              </View>
              <Text 
                style={[
                  styles.amount, 
                  { color: item.direction === 'INBOUND' ? '#22c55e' : '#ef4444' }
                ]}
              >
                ${Math.abs(item.amount).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  list: {
    flex: 1,
  },
  title: {
    fontFamily: 'ClashDisplay',
    fontSize: 20,
    marginBottom: 16,
    color: '#000000',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: '#000000',
  },
  concept: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: '#4b5563',
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  amount: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
  },
});