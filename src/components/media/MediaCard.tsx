
import { MediaItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  // Calculate countdown
  const releaseDate = parseISO(item.releaseDate);
  const now = new Date();
  const countdown = formatDistanceToNow(releaseDate, { addSuffix: true });
  
  return (
    <Card className="flex overflow-hidden bg-jellyseerr-card border-jellyseerr-border hover:bg-jellyseerr-card/90 transition-colors">
      <div className="w-20 h-30 sm:w-32 md:w-40 flex-shrink-0">
        <img 
          src={item.posterPath || "/placeholder.svg"} 
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="p-4 flex flex-col justify-between w-full">
        <div>
          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.type === 'movie' ? 'bg-blue-600' : 'bg-purple-600'
            }`}>
              {item.type === 'movie' ? 'Movie' : 'TV Show'}
            </span>
            
            <span className="text-xs text-jellyseerr-muted">
              {new Date(item.releaseDate).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-jellyseerr-muted line-clamp-2 sm:line-clamp-none">
            {item.overview || "No description available."}
          </p>
        </div>
        
        <div className="mt-3">
          <p className="text-sm font-medium text-accent">
            {new Date() > releaseDate ? 'Released' : `Releases ${countdown}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
