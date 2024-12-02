import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter, useSegments } from 'expo-router';
import { getCurrentUser } from 'aws-amplify/auth';

export default function RootLayout() {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'ClashDisplay': require('../assets/fonts/ClashDisplay-Regular.otf'),
  });

  useEffect(() => {
    async function init() {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecking(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!isAuthChecking) {
      if (!isAuthenticated) {
        router.replace('/(auth)/intro');
      } else {
        router.replace('/');
      }
    }
  }, [isAuthChecking, isAuthenticated]);

  useEffect(() => {
    if (fontsLoaded && !isAuthChecking) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthChecking]);

  if (!fontsLoaded || isAuthChecking) {
    return null;
  }

  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: {
        backgroundColor: 'transparent'
      }
    }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}