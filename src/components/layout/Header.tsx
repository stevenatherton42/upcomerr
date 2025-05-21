
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { Link } from "react-router-dom";
import { Settings, Film, LogOut } from "lucide-react";

export function Header() {
  const { currentUser, logout } = useAuth();
  const { settings } = useSettings();

  return (
    <header className="bg-jellyseerr-card border-b border-jellyseerr-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-accent">
            Upcomerr
          </Link>
        </div>
        
        {currentUser && (
          <div className="flex items-center space-x-3">
            {settings.jellyseerr.enabled && (
              <a href={settings.jellyseerr.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Film className="mr-2 h-4 w-4" />
                  Add Media
                </Button>
              </a>
            )}
            
            {currentUser.isAdmin && (
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
