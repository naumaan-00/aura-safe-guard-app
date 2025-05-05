
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contacts from "./pages/Contacts";
import EmergencyServices from "./pages/EmergencyServices";
import SafetyTips from "./pages/SafetyTips";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/app';
import { Geolocation } from '@capacitor/geolocation';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize Capacitor plugins and listeners
    const initCapacitor = async () => {
      try {
        // Request location permissions
        await Geolocation.requestPermissions();
        
        // Set up app listeners for native functionality
        CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
        });
        
        // Handle back button for Android
        CapacitorApp.addListener('backButton', () => {
          console.log('Back button pressed');
        });
      } catch (error) {
        console.error("Error initializing Capacitor:", error);
      }
    };
    
    initCapacitor();
    
    return () => {
      // Clean up listeners when component unmounts
      CapacitorApp.removeAllListeners();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/emergency-services" element={<EmergencyServices />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
