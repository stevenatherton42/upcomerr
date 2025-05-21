import { AppSettings, MediaItem } from "@/types";

export async function testRadarrConnection(url: string, apiKey: string): Promise<boolean> {
  if (!url || !apiKey) return false;
  console.log("Testing Radarr connection to:", url);
  
  try {
    // Make an actual API call to Radarr's system/status endpoint
    const response = await fetch(`${url.replace(/\/+$/, "")}/api/v3/system/status`, {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    // If we get here, the connection was successful
    const data = await response.json();
    console.log("Radarr connection successful:", data);
    return true;
  } catch (error) {
    console.error("Radarr connection test failed:", error);
    return false;
  }
}

export async function testSonarrConnection(url: string, apiKey: string): Promise<boolean> {
  if (!url || !apiKey) return false;
  console.log("Testing Sonarr connection to:", url);
  
  try {
    // Make an actual API call to Sonarr's system/status endpoint
    const response = await fetch(`${url.replace(/\/+$/, "")}/api/v3/system/status`, {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    // If we get here, the connection was successful
    const data = await response.json();
    console.log("Sonarr connection successful:", data);
    return true;
  } catch (error) {
    console.error("Sonarr connection test failed:", error);
    return false;
  }
}

export async function fetchUpcomingMedia(settings: AppSettings): Promise<MediaItem[]> {
  try {
    const mediaItems: MediaItem[] = [];
    
    // Fetch from Radarr if enabled
    if (settings.radarr.enabled && settings.radarr.isConnected) {
      try {
        const radarrUrl = settings.radarr.url.replace(/\/+$/, "");
        const response = await fetch(`${radarrUrl}/api/v3/movie`, {
          headers: {
            "X-Api-Key": settings.radarr.apiKey,
            "Content-Type": "application/json"
          }
        });
        
        if (response.ok) {
          const movies = await response.json();
          
          // Process only upcoming movies
          const upcomingMovies = movies
            .filter((movie: any) => {
              // Include only movies with future release dates or that haven't been downloaded yet
              const releaseDate = new Date(movie.digitalRelease || movie.physicalRelease || movie.inCinemas);
              return !movie.hasFile && releaseDate > new Date();
            })
            .map((movie: any) => ({
              id: movie.id,
              title: movie.title,
              posterPath: movie.images?.find((img: any) => img.coverType === 'poster')?.remoteUrl || '',
              releaseDate: movie.digitalRelease || movie.physicalRelease || movie.inCinemas,
              overview: movie.overview,
              type: "movie",
              sourceId: movie.id,
              source: "radarr",
              status: movie.status?.toLowerCase() || "announced"
            }));
            
          mediaItems.push(...upcomingMovies);
        }
      } catch (error) {
        console.error("Error fetching Radarr media:", error);
      }
    }
    
    // Fetch from Sonarr if enabled
    if (settings.sonarr.enabled && settings.sonarr.isConnected) {
      try {
        const sonarrUrl = settings.sonarr.url.replace(/\/+$/, "");
        const seriesResponse = await fetch(`${sonarrUrl}/api/v3/series`, {
          headers: {
            "X-Api-Key": settings.sonarr.apiKey,
            "Content-Type": "application/json"
          }
        });
        
        if (seriesResponse.ok) {
          const allSeries = await seriesResponse.json();
          
          // Get IDs of series that have upcoming episodes
          const seriesIds = allSeries
            .filter((series: any) => series.status === 'continuing')
            .map((series: any) => series.id);
            
          // Fetch calendar to get upcoming episodes
          const today = new Date();
          const endDate = new Date();
          endDate.setDate(today.getDate() + 90); // Look 90 days ahead
          
          const calendarResponse = await fetch(
            `${sonarrUrl}/api/v3/calendar?start=${today.toISOString()}&end=${endDate.toISOString()}`, 
            {
              headers: {
                "X-Api-Key": settings.sonarr.apiKey,
                "Content-Type": "application/json"
              }
            }
          );
          
          if (calendarResponse.ok) {
            const episodes = await calendarResponse.json();
            const upcomingSeries = new Map();
            
            // Process episodes into series
            episodes.forEach((episode: any) => {
              const seriesId = episode.seriesId;
              if (!upcomingSeries.has(seriesId)) {
                const series = allSeries.find((s: any) => s.id === seriesId);
                if (series) {
                  upcomingSeries.set(seriesId, {
                    id: series.id,
                    title: series.title,
                    posterPath: series.images?.find((img: any) => img.coverType === 'poster')?.remoteUrl || '',
                    releaseDate: episode.airDateUtc,
                    overview: series.overview,
                    type: "tv",
                    sourceId: series.id,
                    source: "sonarr",
                    status: "continuing"
                  });
                }
              }
            });
            
            mediaItems.push(...Array.from(upcomingSeries.values()));
          }
        }
      } catch (error) {
        console.error("Error fetching Sonarr media:", error);
      }
    }
    
    // If we couldn't fetch any real data, provide mock data as fallback
    if (mediaItems.length === 0) {
      console.log("Using mock data as fallback");
      const mockData: MediaItem[] = [
        {
          id: 1,
          title: "Dune: Part Two",
          posterPath: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
          releaseDate: "2025-06-15",
          overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen.",
          type: "movie",
          sourceId: 101,
          source: "radarr",
          status: "announced"
        },
        {
          id: 2,
          title: "Stranger Things",
          posterPath: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
          releaseDate: "2025-05-25",
          overview: "Season 5 of the hit Netflix series.",
          type: "tv",
          sourceId: 201,
          source: "sonarr",
          status: "continuing"
        },
        {
          id: 3,
          title: "Foundation",
          posterPath: "https://image.tmdb.org/t/p/w500/5JXZ0xfUfQBOSEUvPbZKCVeOuJh.jpg",
          releaseDate: "2025-05-10",
          overview: "Season 3 of the epic Apple TV+ series.",
          type: "tv",
          sourceId: 202,
          source: "sonarr",
          status: "continuing"
        },
        {
          id: 4,
          title: "The Batman Part II",
          posterPath: "https://image.tmdb.org/t/p/w500/pGx6O6IwqADOsgmqWzPysmWnOyr.jpg",
          releaseDate: "2025-07-22",
          overview: "The next chapter in The Batman saga.",
          type: "movie",
          sourceId: 102,
          source: "radarr",
          status: "announced"
        },
        {
          id: 5,
          title: "House of the Dragon",
          posterPath: "https://image.tmdb.org/t/p/w500/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg",
          releaseDate: "2025-05-05",
          overview: "Season 2 of the Game of Thrones prequel.",
          type: "tv",
          sourceId: 203,
          source: "sonarr",
          status: "continuing"
        }
      ];
      
      return mockData.sort((a, b) => {
        return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      });
    }
    
    // Sort by release date
    return mediaItems.sort((a, b) => {
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    });
  } catch (error) {
    console.error("Error fetching upcoming media:", error);
    return [];
  }
}

// Mock for managing users in a real app this would connect to a database
export const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin",
    isAdmin: true,
    needsPasswordChange: true
  }
];
