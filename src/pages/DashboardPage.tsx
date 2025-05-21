
import { MediaList } from "@/components/media/MediaList";
import { Layout } from "@/components/layout/Layout";
import { useSettings } from "@/contexts/SettingsContext";

export default function DashboardPage() {
  const { settings } = useSettings();
  
  const hasConnectedServices = 
    (settings.radarr.enabled && settings.radarr.isConnected) || 
    (settings.sonarr.enabled && settings.sonarr.isConnected);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Upcoming Movies & TV Shows</h1>
          <p className="text-jellyseerr-muted">
            Discover what's coming next from your Radarr and Sonarr libraries
          </p>
        </div>
        
        {!hasConnectedServices ? (
          <div className="bg-jellyseerr-card rounded-lg p-6 border border-jellyseerr-border text-center">
            <h2 className="text-xl font-semibold mb-2">No services connected</h2>
            <p className="text-jellyseerr-muted mb-4">
              You need to connect at least one service to view upcoming media.
            </p>
          </div>
        ) : (
          <MediaList />
        )}
      </div>
    </Layout>
  );
}
