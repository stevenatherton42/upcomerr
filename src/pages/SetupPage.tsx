
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionSettings } from "@/components/settings/ConnectionSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Settings, Server } from "lucide-react";

export default function SetupPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-4 bg-jellyseerr-background">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-accent">Upcomerr Setup</h1>
            <p className="text-jellyseerr-muted">
              Configure your Radarr and Sonarr connections to get started
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-jellyseerr-card border border-jellyseerr-border rounded-md">
              <Server size={16} className="text-accent" />
              <span className="text-xs font-medium text-jellyseerr-muted">Initial Setup</span>
            </div>
            <div className="h-[2px] w-6 bg-jellyseerr-border"></div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-jellyseerr-border/20 rounded-md">
              <Home size={16} className="text-jellyseerr-muted" />
              <span className="text-xs font-medium text-jellyseerr-muted">Dashboard</span>
            </div>
          </div>
        </div>
        
        <Card className="bg-jellyseerr-card border-jellyseerr-border mb-8">
          <CardHeader>
            <CardTitle>Welcome to Upcomerr</CardTitle>
            <CardDescription>
              Let's get your media monitoring system set up. You'll need your Radarr and/or Sonarr API keys.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Upcomerr connects to your existing Radarr and Sonarr instances to monitor and display
              upcoming media releases. At least one of these services must be configured.
            </p>
            
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-jellyseerr-background rounded-md">
                <h3 className="font-medium mb-2">How to find your Radarr API key:</h3>
                <ol className="list-decimal list-inside space-y-1 text-jellyseerr-muted">
                  <li>Log into your Radarr instance</li>
                  <li>Go to Settings &gt; General</li>
                  <li>Find the "API Key" section</li>
                </ol>
              </div>
              
              <div className="p-4 bg-jellyseerr-background rounded-md">
                <h3 className="font-medium mb-2">How to find your Sonarr API key:</h3>
                <ol className="list-decimal list-inside space-y-1 text-jellyseerr-muted">
                  <li>Log into your Sonarr instance</li>
                  <li>Go to Settings &gt; General</li>
                  <li>Find the "API Key" section</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ConnectionSettings />
      </div>
    </div>
  );
}
