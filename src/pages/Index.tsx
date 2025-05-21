import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import SetupPage from "./SetupPage";

const Index = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { settings, loading: settingsLoading } = useSettings();
  const navigate = useNavigate();

  // Handle first-time setup or direct users to the appropriate page
  useEffect(() => {
    if (!authLoading && !settingsLoading) {
      // If user is logged in and setup is not completed, redirect to setup
      if (currentUser && !settings.setupCompleted) {
        navigate("/setup");
      }
    }
  }, [currentUser, settings.setupCompleted, authLoading, settingsLoading, navigate]);
  
  // Show loading state
  if (authLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jellyseerr-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-jellyseerr-muted">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not logged in, show login page
  if (!currentUser) {
    return <LoginPage />;
  }
  
  // If logged in but setup not completed, show setup page
  if (!settings.setupCompleted) {
    return <SetupPage />;
  }
  
  // Otherwise show the dashboard
  return <DashboardPage />;
};

export default Index;
