
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ConnectionSettings } from "@/components/settings/ConnectionSettings";
import { UserManagement } from "@/components/settings/UserManagement";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("connections");
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-jellyseerr-muted">
              Configure your Upcomerr instance
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="mt-0">
            <ConnectionSettings />
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
