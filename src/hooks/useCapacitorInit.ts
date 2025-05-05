
import { useCallback } from "react";

// Check if we're running in a Capacitor native app environment
const isCapacitorNative = 
  // @ts-ignore - window.Capacitor might not exist in TypeScript definitions
  typeof window !== "undefined" && window.Capacitor && window.Capacitor.isNative;

export function useCapacitorInit() {
  const initCapacitor = useCallback(async () => {
    if (isCapacitorNative) {
      try {
        // Dynamically import Capacitor plugins when in a native environment
        const { App } = await import("@capacitor/app");
        const { Geolocation } = await import("@capacitor/geolocation");
        
        // Request location permissions
        await Geolocation.requestPermissions();
        
        // Set up app listeners for native functionality
        App.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
        });
        
        // Handle back button for Android
        App.addListener('backButton', () => {
          console.log('Back button pressed');
          // Implement custom back button behavior if needed
        });
        
        console.log("Capacitor initialized successfully in native environment");
      } catch (error) {
        console.error("Error initializing Capacitor:", error);
      }
    } else {
      console.log("Running in browser environment - native capabilities not available");
    }
  }, []);
  
  const cleanupCapacitor = useCallback(() => {
    const cleanupAsync = async () => {
      if (isCapacitorNative) {
        try {
          const { App } = await import("@capacitor/app");
          App.removeAllListeners();
          console.log("Capacitor listeners removed");
        } catch (error) {
          console.error("Error cleaning up Capacitor:", error);
        }
      }
    };
    
    cleanupAsync();
  }, []);
  
  return { initCapacitor, cleanupCapacitor };
}
