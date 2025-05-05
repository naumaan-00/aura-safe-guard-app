
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ChevronRight, User, Bell, Moon, Smartphone, VolumeX } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    gestureControl: true,
    darkMode: false,
    notificationsEnabled: true,
    sensitivityLevel: 'medium',
    silentMode: false,
    vibrationAlerts: true,
    saveAudioClips: false,
  });
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'updated'}.`
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4">
      <header className="flex items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Settings</h1>
      </header>
      
      <main className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Account</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <Button variant="ghost" className="w-full justify-between p-4 h-auto" onClick={() => navigate('/profile')}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span>Profile Information</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">General</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Gesture Control</span>
                  <p className="text-sm text-muted-foreground">Triple-tap power button for emergency</p>
                </div>
              </div>
              <Switch 
                checked={settings.gestureControl}
                onCheckedChange={(checked) => handleSettingChange('gestureControl', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Moon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Dark Mode</span>
              </div>
              <Switch 
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Notifications</span>
              </div>
              <Switch 
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <VolumeX className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Silent Mode</span>
                  <p className="text-sm text-muted-foreground">No sounds during emergency</p>
                </div>
              </div>
              <Switch 
                checked={settings.silentMode}
                onCheckedChange={(checked) => handleSettingChange('silentMode', checked)}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Audio Detection</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm font-medium mb-2">Detection Sensitivity</p>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <Button 
                  key={level}
                  variant={settings.sensitivityLevel === level ? "default" : "outline"}
                  className="text-sm"
                  onClick={() => handleSettingChange('sensitivityLevel', level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Save Audio Clips</span>
                <p className="text-xs text-muted-foreground">Store detected threat audio</p>
              </div>
              <Switch 
                checked={settings.saveAudioClips}
                onCheckedChange={(checked) => handleSettingChange('saveAudioClips', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              toast({
                title: "App Version",
                description: "AuraSafeGuard v1.0.0"
              });
            }}
          >
            About AuraSafeGuard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
