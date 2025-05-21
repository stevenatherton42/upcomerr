
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppSettings } from "@/types";
import { testRadarrConnection, testSonarrConnection } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  testRadarrConnection: () => Promise<boolean>;
  testSonarrConnection: () => Promise<boolean>;
  saveSettings: () => void;
  loading: boolean;
}

const defaultSettings: AppSettings = {
  radarr: {
    enabled: false,
    url: "",
    apiKey: "",
    isConnected: false
  },
  sonarr: {
    enabled: false,
    url: "",
    apiKey: "",
    isConnected: false
  },
  jellyseerr: {
    enabled: false,
    url: ""
  },
  setupCompleted: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
    setLoading(false);
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(current => ({ ...current, ...newSettings }));
  };

  const testRadarrConn = async () => {
    if (!settings.radarr.enabled) return false;
    
    const isConnected = await testRadarrConnection(
      settings.radarr.url,
      settings.radarr.apiKey
    );
    
    setSettings(current => ({
      ...current,
      radarr: {
        ...current.radarr,
        isConnected
      }
    }));
    
    if (isConnected) {
      toast({
        title: "Radarr connection successful",
        description: "Successfully connected to Radarr",
      });
    } else {
      toast({
        title: "Radarr connection failed",
        description: "Could not connect to Radarr. Please check your settings.",
        variant: "destructive",
      });
    }
    
    return isConnected;
  };

  const testSonarrConn = async () => {
    if (!settings.sonarr.enabled) return false;
    
    const isConnected = await testSonarrConnection(
      settings.sonarr.url,
      settings.sonarr.apiKey
    );
    
    setSettings(current => ({
      ...current,
      sonarr: {
        ...current.sonarr,
        isConnected
      }
    }));
    
    if (isConnected) {
      toast({
        title: "Sonarr connection successful",
        description: "Successfully connected to Sonarr",
      });
    } else {
      toast({
        title: "Sonarr connection failed",
        description: "Could not connect to Sonarr. Please check your settings.",
        variant: "destructive",
      });
    }
    
    return isConnected;
  };

  const saveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  const value = {
    settings,
    updateSettings,
    testRadarrConnection: testRadarrConn,
    testSonarrConnection: testSonarrConn,
    saveSettings,
    loading
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
