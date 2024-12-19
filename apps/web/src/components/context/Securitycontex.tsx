"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  ip: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
}

interface SecurityContextType {
  location: LocationData | null;
  lastActivity: Date;
  requestLocationPermission: () => Promise<boolean>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [lastActivity, setLastActivity] = useState(new Date());
  const router = useRouter();
  const { toast } = useToast();

  const trackActivity = () => {
    setLastActivity(new Date());
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      
      if (permission.state === 'granted') {
        await updateLocation();
        return true;
      }

      if (permission.state === 'prompt') {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async () => {
              await updateLocation();
              resolve(true);
            },
            () => {
              toast({
                title: "Ubicación requerida",
                description: "Necesitamos acceso a tu ubicación para continuar",
                variant: "destructive",
              });
              resolve(false);
            }
          );
        });
      }

      return false;
    } catch (error) {
      console.error('Error requesting location:', error);
      return false;
    }
  };

  const updateLocation = async () => {
    try {
      // Get IP-based location as fallback
      const response = await fetch('https://ipapi.co/json/');
      const ipData = await response.json();

      // Get precise location if available
      const preciseLocation = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setLocation({
        ip: ipData.ip,
        city: ipData.city,
        country: ipData.country_name,
        latitude: preciseLocation.coords.latitude,
        longitude: preciseLocation.coords.longitude,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  // Session timeout management
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      trackActivity();
      
      timeoutId = setTimeout(async () => {
        await signOut();
        router.push('/login');
        toast({
          title: "Sesión expirada",
          description: "Tu sesión ha expirado por inactividad",
          variant: "destructive",
        });
      }, TIMEOUT_DURATION);
    };

    // Track user activity
    const activities = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activities.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    // Initial timeout setup
    resetTimeout();

    // Cleanup
    return () => {
      activities.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router]);

  // Periodic location updates
  useEffect(() => {
    if (location) {
      const locationInterval = setInterval(updateLocation, 30 * 60 * 1000); // Update every 30 minutes
      return () => clearInterval(locationInterval);
    }
  }, [location]);

  return (
    <SecurityContext.Provider value={{ location, lastActivity, requestLocationPermission }}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};