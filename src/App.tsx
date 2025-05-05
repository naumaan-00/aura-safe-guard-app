
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

const queryClient = new QueryClient();

// Create stub for mobile capabilities that will be replaced by actual implementations when running on a device
const createCapacitorStubs = () => {
  // Stub implementation that works in browser
  return {
    initCapacitor: async () => {
      console.log("Capacitor stub initialized - actual functionality available on mobile devices");
    },
    cleanupCapacitor: () => {
      console.log("Capacitor stub cleanup - actual functionality available on mobile devices");
    }
  };
};

const App = () => {
  useEffect(() => {
    // Use stub implementation for browser development
    const { initCapacitor, cleanupCapacitor } = createCapacitorStubs();
    
    // Initialize mobile capabilities
    initCapacitor();
    
    return () => {
      // Clean up when component unmounts
      cleanupCapacitor();
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
