
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Phone, Users, Shield, Settings, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmergencyButton from '@/components/EmergencyButton';
import { useNavigate } from 'react-router-dom';
import AudioAnalyzer from '@/components/AudioAnalyzer';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMonitoring, setIsMonitoring] = useState(false);

  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Activated",
      description: "Sending your location to emergency contacts",
      variant: "destructive"
    });
    // In a real app, this would trigger the SOS functionality
  };

  const toggleAudioMonitoring = () => {
    if (!isMonitoring) {
      toast({
        title: "Audio Monitoring Active",
        description: "AuraSafeGuard is now listening for signs of distress",
      });
    } else {
      toast({
        title: "Audio Monitoring Stopped",
        description: "AuraSafeGuard is no longer monitoring audio",
      });
    }
    setIsMonitoring(!isMonitoring);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4">
      <header className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">AuraSafeGuard</h1>
          <p className="text-sm text-muted-foreground">Your Personal Safety Guardian</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <main className="mt-6 space-y-6">
        <EmergencyButton onActivate={handleEmergency} />

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Button 
                className={`w-16 h-16 rounded-full transition-all ${isMonitoring ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
                onClick={toggleAudioMonitoring}
              >
                <Mic className="h-8 w-8" />
              </Button>
              <p className="mt-2 text-sm font-medium">{isMonitoring ? "Stop" : "Start"} Monitoring</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Button 
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => navigate('/contacts')}
              >
                <Users className="h-8 w-8" />
              </Button>
              <p className="mt-2 text-sm font-medium">Contacts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Button 
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => navigate('/emergency-services')}
              >
                <Phone className="h-8 w-8" />
              </Button>
              <p className="mt-2 text-sm font-medium">Emergency Services</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Button 
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => navigate('/safety-tips')}
              >
                <Shield className="h-8 w-8" />
              </Button>
              <p className="mt-2 text-sm font-medium">Safety Tips</p>
            </CardContent>
          </Card>
        </div>

        {isMonitoring && <AudioAnalyzer onThreatDetected={handleEmergency} />}

        <Card className="bg-amber-50 border-amber-200 mt-6">
          <CardContent className="p-4 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Enable Gesture Control</h3>
              <p className="text-sm text-amber-700">Triple-tap the power button to activate emergency mode even when your phone is locked.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
