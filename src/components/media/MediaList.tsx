
import { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import { MediaCard } from "./MediaCard";
import { fetchUpcomingMedia } from "@/lib/api";
import { useSettings } from "@/contexts/SettingsContext";
import { Skeleton } from "@/components/ui/skeleton";

export function MediaList() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();
  
  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      const items = await fetchUpcomingMedia(settings);
      setMediaItems(items);
      setLoading(false);
    };
    
    loadMedia();
    
    // Set up polling every 5 minutes
    const interval = setInterval(loadMedia, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [settings]);
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex overflow-hidden bg-jellyseerr-card rounded-lg border border-jellyseerr-border">
            <Skeleton className="w-20 h-30 sm:w-32 md:w-40" />
            <div className="p-4 w-full">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (mediaItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-jellyseerr-card rounded-lg border border-jellyseerr-border text-center">
        <h3 className="text-xl font-semibold mb-2">No upcoming media found</h3>
        <p className="text-jellyseerr-muted mb-4">
          There are no upcoming movies or TV shows in your Radarr or Sonarr instances.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {mediaItems.map((item) => (
        <MediaCard key={`${item.source}-${item.id}`} item={item} />
      ))}
    </div>
  );
}
