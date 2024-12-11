import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  return (
    <LinearGradient
      colors={['rgba(249,246,244,1)', 'rgba(249,246,244,1)', 'rgba(232,217,202,1)']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      <Text style={styles.tagline}>
        Centraliza el dinero de tu negocio
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  tagline: {
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'ClashDisplay',
    color: colors.black,
    marginVertical: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'ClashDisplay',
  }
});