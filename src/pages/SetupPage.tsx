
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionSettings } from "@/components/settings/ConnectionSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <div className="min-h-screen p-4 bg-jellyseerr-background">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-accent">Upcomerr Setup</h1>
          <p className="text-jellyseerr-muted">
            Configure your Radarr and Sonarr connections to get started
          </p>
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
