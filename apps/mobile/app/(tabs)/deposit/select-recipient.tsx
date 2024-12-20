import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/app/constants/colors';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource";
import { Skeleton } from '@/app/components/Skeleton';

interface Contact {
  id: string;
  name: string;
  alias?: string;
  clabe?: string;
  card?: string;
  phone?: string;
}

export default function SelectRecipientScreen() {
  const { amount, commission } = useLocalSearchParams<{ amount: string, commission: string }>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    let isMounted = true;

    async function fetchContacts() {
      try {
        const { username } = await getCurrentUser();
        const response = await client.models.Contact.list({
          filter: { userId: { eq: username } },
          authMode: 'userPool'
        });

        if (isMounted && response.data) {
          setContacts(response.data as Contact[]);
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContacts();
    return () => { isMounted = false; };
  }, []);

  const handleRecipientSelect = (contact: Contact) => {
    router.push({
      pathname: '/deposit/confirm',
      params: {
        amount,
        commission,
        recipientId: contact.id,
        recipientName: contact.alias || contact.name,
        accountNumber: contact.clabe || contact.card || contact.phone,
      },
    });
  };

  const handleNewRecipient = () => {
    router.push({
      pathname: '/deposit/new',
      params: { amount, commission }
    });
  };

  const getAccountPreview = (contact: Contact) => {
    if (contact.clabe) return `CLABE: ****${contact.clabe.slice(-4)}`;
    if (contact.card) return `Tarjeta: ****${contact.card.slice(-4)}`;
    if (contact.phone) return `Cel: ****${contact.phone.slice(-4)}`;
    return '';
  };

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Seleccionar destinatario</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.newRecipientButton}
            onPress={handleNewRecipient}
          >
            <View style={styles.iconContainer}>
              <Feather name="plus" size={24} color={colors.black} />
            </View>
            <Text style={styles.newRecipientText}>Nuevo destinatario</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Contactos guardados</Text>

          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <View key={index} style={styles.recipientItem}>
                <View style={styles.avatarContainer}>
                  <Skeleton width={40} height={40} />
                </View>
                <View style={styles.recipientInfo}>
                  <Skeleton width={150} height={20} />
                  <View style={{ marginTop: 4 }}>
                    <Skeleton width={100} height={16} />
                  </View>
                </View>
              </View>
            ))
          ) : contacts.length > 0 ? (
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.recipientItem}
                  onPress={() => handleRecipientSelect(item)}
                >
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                      {(item.alias || item.name).charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>
                      {item.alias || item.name}
                    </Text>
                    <Text style={styles.accountNumber}>
                      {getAccountPreview(item)}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={24} color={colors.lightGray} />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.emptyText}>
              No hay contactos guardados
            </Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'ClashDisplay',
    fontSize: 20,
    color: colors.black,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  newRecipientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.beige,
    borderRadius: 12,
    marginBottom: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newRecipientText: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
  },
  sectionTitle: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 16,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.beige,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'ClashDisplay',
    fontSize: 18,
    color: colors.black,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: colors.darkGray,
  },
  emptyText: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 24,
  },
});