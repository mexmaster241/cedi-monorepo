import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { signIn } from 'aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth';
import NetInfo from "@react-native-community/netinfo";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage('');
      if (!email || !password) {
        setErrorMessage('Por favor ingresa tu email y contraseña');
        return;
      }
      
      // Check network status
      const networkState = await NetInfo.fetch();
      console.log('Network state:', networkState);
      
      if (!networkState.isConnected) {
        setErrorMessage('No hay conexión a internet');
        return;
      }

      console.log('Attempting sign in with:', { username: email.trim() });
      const signInResult = await signIn({
        username: email.trim(),
        password,
      }).catch(e => {
        console.log('Sign in catch block:', e);
        throw e;
      });
      
      console.log('Sign in completed:', signInResult);
      
      // If sign in is successful, redirect to the tabs
      if (signInResult.isSignedIn) {
        router.replace('/tabs' as any); // Type assertion needed for router path
      }
      
    } catch (error) {
      console.log('Error type:', typeof error);
      console.log('Error instanceof Error:', error instanceof Error);
      console.log('Error keys:', Object.keys(error as object));
      console.log('Detailed error:', JSON.stringify(error, null, 2));
      
      if (error instanceof AuthError) {
        switch(error.name) {
          case 'UserNotConfirmedException':
            setErrorMessage('Por favor verifica tu cuenta de email');
            break;
          case 'NotAuthorizedException':
            setErrorMessage('Email o contraseña incorrectos');
            break;
          case 'UserNotFoundException':
            setErrorMessage('No existe una cuenta con este email');
            break;
          default:
            setErrorMessage(`Error al iniciar sesión: ${error.message}`);
        }
      } else {
        setErrorMessage('Hubo un error inesperado. Por favor intenta de nuevo.');
      }
      console.error('Full error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(249,246,244,1)', 'rgba(249,246,244,1)', 'rgba(232,217,202,1)']}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Empieza tu camino</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
          />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('https://main.d3n362okhpkge4.amplifyapp.com/sign-up')}>
            <Text style={styles.signupLink}>Aplica aquí</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Ingresa</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'ClashDisplay',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'ClashDisplay',
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'ClashDisplay',
    color: colors.black,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: colors.black,
  },
  signupLink: {
    fontFamily: 'ClashDisplay',
    fontSize: 14,
    color: colors.black,
    textDecorationLine: 'underline',
  },
});