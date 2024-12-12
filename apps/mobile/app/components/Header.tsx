import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../constants/colors';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { Schema } from "config/amplify/data/resource"

export function Header() {
  const [fullName, setFullName] = useState("Loading...");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const attributes = await fetchUserAttributes();
        const name = `${attributes.given_name || ""} ${attributes.family_name || ""}`.trim();
        setFullName(name || "Usuario");
      } catch (err) {
        console.error("Error fetching user data:", err);
        setFullName("Usuario");
      }
    }
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.greeting}>Bienvenido de nuevo</Text>
        <Text style={styles.name}>{fullName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  welcomeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  greeting: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.darkGray,
  },
  name: {
    fontFamily: 'ClashDisplay',
    fontSize: 24,
    color: colors.black,
  },
});