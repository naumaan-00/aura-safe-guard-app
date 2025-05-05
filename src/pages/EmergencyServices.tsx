
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, MapPin, AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const EmergencyServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const emergencyServices = [
    { 
      id: '1', 
      name: 'Police', 
      number: '911', 
      description: 'For immediate police assistance'
    },
    { 
      id: '2', 
      name: 'Women\'s Helpline', 
      number: '1-800-799-7233', 
      description: 'National Domestic Violence Hotline'
    },
    { 
      id: '3', 
      name: 'Crisis Text Line', 
      number: 'Text HOME to 741741', 
      description: 'Crisis support via text message'
    },
    { 
      id: '4', 
      name: 'Emergency Medical Services', 
      number: '911', 
      description: 'For medical emergencies'
    },
  ];
  
  const handleCall = (service: typeof emergencyServices[0]) => {
    // In a real app, this would initiate a phone call
    toast({
      title: `Calling ${service.name}`,
      description: `Dialing ${service.number}...`
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4">
      <header className="flex items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Emergency Services</h1>
      </header>
      
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-6 flex">
        <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          In case of immediate danger, directly call emergency services by tapping on a service below. 
          Your location will automatically be shared when the call connects.
        </p>
      </div>
      
      <main className="space-y-4">
        {emergencyServices.map(service => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <p className="text-primary font-medium">{service.number}</p>
              </div>
              <div className="grid grid-cols-2 border-t">
                <Button 
                  variant="ghost" 
                  className="h-12 rounded-none flex items-center justify-center gap-2"
                  onClick={() => handleCall(service)}
                >
                  <Phone className="h-4 w-4" /> Call
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-12 rounded-none border-l flex items-center justify-center gap-2"
                  onClick={() => {
                    // In a real app, this would show the service's location on a map
                    toast({
                      title: "Location Access",
                      description: "Finding nearby locations for " + service.name
                    });
                  }}
                >
                  <MapPin className="h-4 w-4" /> Find Nearby
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default EmergencyServices;
