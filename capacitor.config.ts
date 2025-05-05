
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1ddda4cfb2684a0e9fba47f6553d26a6',
  appName: 'AuraSafeGuard',
  webDir: 'dist',
  server: {
    url: 'https://1ddda4cf-b268-4a0e-9fba-47f6553d26a6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      plist: {
        NSLocationWhenInUseUsageDescription: "We need access to your location to send emergency alerts.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "We need access to your location to send emergency alerts even when the app is not in use."
      }
    }
  }
};

export default config;
