
import { AppSettings, MediaItem } from "@/types";

// This is a mock implementation since we're not actually connecting to APIs yet
export async function testRadarrConnection(url: string, apiKey: string): Promise<boolean> {
  try {
    // In a real implementation, we would make an actual API call to Radarr
    // For now we'll simulate a successful response if inputs are not empty
    if (!url || !apiKey) return false;
    console.log("Testing Radarr connection to:", url);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("Radarr connection test failed:", error);
    return false;
  }
}

export async function testSonarrConnection(url: string, apiKey: string): Promise<boolean> {
  try {
    // In a real implementation, we would make an actual API call to Sonarr
    // For now we'll simulate a successful response if inputs are not empty
    if (!url || !apiKey) return false;
    console.log("Testing Sonarr connection to:", url);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("Sonarr connection test failed:", error);
    return false;
  }
}

export async function fetchUpcomingMedia(settings: AppSettings): Promise<MediaItem[]> {
  try {
    // In a real implementation, we would fetch data from Radarr and Sonarr APIs
    // For now, return mock data
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
