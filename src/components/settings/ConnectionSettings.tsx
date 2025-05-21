
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ConnectionSettings() {
  const { settings, updateSettings, testRadarrConnection, testSonarrConnection, saveSettings } = useSettings();
  const [loading, setLoading] = useState({
    radarr: false,
    sonarr: false,
    save: false
  });

  const handleSave = async () => {
    setLoading(prev => ({ ...prev, save: true }));
    
    // Test connections before saving if they're enabled
    let canSave = true;
    
    if (settings.radarr.enabled && !settings.radarr.isConnected) {
      setLoading(prev => ({ ...prev, radarr: true }));
      const radarrConnected = await testRadarrConnection();
      setLoading(prev => ({ ...prev, radarr: false }));
      if (!radarrConnected) canSave = false;
    }
    
    if (settings.sonarr.enabled && !settings.sonarr.isConnected) {
      setLoading(prev => ({ ...prev, sonarr: true }));
      const sonarrConnected = await testSonarrConnection();
      setLoading(prev => ({ ...prev, sonarr: false }));
      if (!sonarrConnected) canSave = false;
    }
    
    if (canSave) {
      saveSettings();
      updateSettings({ setupCompleted: true });
    }
    
    setLoading(prev => ({ ...prev, save: false }));
  };

  const handleRadarrTest = async () => {
    setLoading(prev => ({ ...prev, radarr: true }));
    await testRadarrConnection();
    setLoading(prev => ({ ...prev, radarr: false }));
  };

  const handleSonarrTest = async () => {
    setLoading(prev => ({ ...prev, sonarr: true }));
    await testSonarrConnection();
    setLoading(prev => ({ ...prev, sonarr: false }));
  };

  return (
    <div className="space-y-6">
      {!settings.radarr.enabled && !settings.sonarr.enabled && (
        <Alert className="bg-yellow-900/20 border-yellow-700 text-yellow-100">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            At least one service (Radarr or Sonarr) must be enabled for Upcomerr to function.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-jellyseerr-card border-jellyseerr-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Radarr</CardTitle>
              <CardDescription>Connect to your Radarr instance to monitor upcoming movies</CardDescription>
            </div>
            <Switch
              checked={settings.radarr.enabled}
              onCheckedChange={(checked) =>
                updateSettings({
                  radarr: {
                    ...settings.radarr,
                    enabled: checked,
                    isConnected: false
                  }
                })
              }
            />
          </div>
        </CardHeader>
        {settings.radarr.enabled && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="radarrUrl">Radarr URL</Label>
              <Input
                id="radarrUrl"
                placeholder="http://localhost:7878"
                value={settings.radarr.url}
                onChange={(e) =>
                  updateSettings({
                    radarr: {
                      ...settings.radarr,
                      url: e.target.value,
                      isConnected: false
                    }
                  })
                }
                className="bg-jellyseerr-background border-jellyseerr-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="radarrApiKey">API Key</Label>
              <Input
                id="radarrApiKey"
                type="password"
                placeholder="Your Radarr API key"
                value={settings.radarr.apiKey}
                onChange={(e) =>
                  updateSettings({
                    radarr: {
                      ...settings.radarr,
                      apiKey: e.target.value,
                      isConnected: false
                    }
                  })
                }
                className="bg-jellyseerr-background border-jellyseerr-border"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleRadarrTest} 
                disabled={loading.radarr || !settings.radarr.url || !settings.radarr.apiKey}
              >
                {loading.radarr ? "Testing..." : "Test Connection"}
              </Button>
            </div>
            
            {settings.radarr.isConnected && (
              <div className="p-3 bg-green-900/20 border border-green-700 rounded-md text-green-100 text-sm">
                Successfully connected to Radarr
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <Card className="bg-jellyseerr-card border-jellyseerr-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sonarr</CardTitle>
              <CardDescription>Connect to your Sonarr instance to monitor upcoming TV shows</CardDescription>
            </div>
            <Switch
              checked={settings.sonarr.enabled}
              onCheckedChange={(checked) =>
                updateSettings({
                  sonarr: {
                    ...settings.sonarr,
                    enabled: checked,
                    isConnected: false
                  }
                })
              }
            />
          </div>
        </CardHeader>
        {settings.sonarr.enabled && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sonarrUrl">Sonarr URL</Label>
              <Input
                id="sonarrUrl"
                placeholder="http://localhost:8989"
                value={settings.sonarr.url}
                onChange={(e) =>
                  updateSettings({
                    sonarr: {
                      ...settings.sonarr,
                      url: e.target.value,
                      isConnected: false
                    }
                  })
                }
                className="bg-jellyseerr-background border-jellyseerr-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sonarrApiKey">API Key</Label>
              <Input
                id="sonarrApiKey"
                type="password"
                placeholder="Your Sonarr API key"
                value={settings.sonarr.apiKey}
                onChange={(e) =>
                  updateSettings({
                    sonarr: {
                      ...settings.sonarr,
                      apiKey: e.target.value,
                      isConnected: false
                    }
                  })
                }
                className="bg-jellyseerr-background border-jellyseerr-border"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSonarrTest} 
                disabled={loading.sonarr || !settings.sonarr.url || !settings.sonarr.apiKey}
              >
                {loading.sonarr ? "Testing..." : "Test Connection"}
              </Button>
            </div>
            
            {settings.sonarr.isConnected && (
              <div className="p-3 bg-green-900/20 border border-green-700 rounded-md text-green-100 text-sm">
                Successfully connected to Sonarr
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <Card className="bg-jellyseerr-card border-jellyseerr-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Jellyseerr Integration</CardTitle>
              <CardDescription>Connect to Jellyseerr to request new media</CardDescription>
            </div>
            <Switch
              checked={settings.jellyseerr.enabled}
              onCheckedChange={(checked) =>
                updateSettings({
                  jellyseerr: {
                    ...settings.jellyseerr,
                    enabled: checked
                  }
                })
              }
            />
          </div>
        </CardHeader>
        {settings.jellyseerr.enabled && (
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="jellyseerrUrl">Jellyseerr URL</Label>
              <Input
                id="jellyseerrUrl"
                placeholder="http://localhost:5055"
                value={settings.jellyseerr.url}
                onChange={(e) =>
                  updateSettings({
                    jellyseerr: {
                      ...settings.jellyseerr,
                      url: e.target.value
                    }
                  })
                }
                className="bg-jellyseerr-background border-jellyseerr-border"
              />
            </div>
          </CardContent>
        )}
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={
            loading.save || 
            (!settings.radarr.enabled && !settings.sonarr.enabled) ||
            (settings.radarr.enabled && !settings.radarr.isConnected) ||
            (settings.sonarr.enabled && !settings.sonarr.isConnected)
          }
        >
          {loading.save ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
