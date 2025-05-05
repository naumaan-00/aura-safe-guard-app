
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
import { useCapacitorInit } from "./hooks/useCapacitorInit";

const queryClient = new QueryClient();

const App = () => {
  const { initCapacitor, cleanupCapacitor } = useCapacitorInit();

  useEffect(() => {
    initCapacitor();
    return () => {
      cleanupCapacitor();
    };
  }, [initCapacitor, cleanupCapacitor]);

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
