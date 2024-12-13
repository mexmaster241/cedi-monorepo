import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '@/app/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource";
import { useState, useEffect } from 'react';

export default function Card() {
  const [clabe, setClabe] = useState("");
  const client = generateClient<Schema>();

  useEffect(() => {
    async function fetchClabe() {
      try {
        const { username } = await getCurrentUser();
        const userResult = await client.models.User.get({ 
          id: username,
        }, {
          authMode: 'userPool',
          selectionSet: ['id', 'clabe']
        });
        
        setClabe(userResult.data?.clabe ?? "");
      } catch (err) {
        console.error("Error fetching CLABE:", err);
        setClabe("");
      }
    }
    fetchClabe();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(clabe);
    // wip notification
    Alert.alert('CLABE copiada al portapapeles');
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Tarjeta</Text>
        </View>

        <View style={styles.content}>
          {/* Card Information Section */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Add your card design here */}
              <Text style={styles.cardNumber}>**** **** **** 1234</Text>
              <Text style={styles.cardHolder}>JOHN DOE</Text>
              <Text style={styles.expiry}>12/25</Text>
            </View>
          </View>

          {/* CLABE Section */}
          <View style={styles.clabeContainer}>
            <Text style={styles.clabeTitle}>CLABE</Text>
            <View style={styles.clabeBox}>
              <Text style={styles.clabeNumber}>{clabe || "Loading..."}</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Ionicons name="copy-outline" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  content: {
    padding: 20,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 24,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: colors.black,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardNumber: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    fontFamily: 'ClashDisplay',
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ClashDisplay',
  },
  expiry: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ClashDisplay',
  },
  clabeContainer: {
    marginTop: 20,
  },
  clabeTitle: {
    fontSize: 16,
    fontFamily: 'ClashDisplay',
    marginBottom: 10,
  },
  clabeBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clabeNumber: {
    fontSize: 18,
    fontFamily: 'ClashDisplay',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: colors.beige,
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
});