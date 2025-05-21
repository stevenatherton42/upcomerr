
export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  email?: string;
}

export interface MediaItem {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  overview: string;
  type: 'movie' | 'tv';
  sourceId: number;
  source: 'radarr' | 'sonarr';
  status: string;
}

export interface AppSettings {
  radarr: {
    enabled: boolean;
    url: string;
    apiKey: string;
    isConnected: boolean;
  };
  sonarr: {
    enabled: boolean;
    url: string;
    apiKey: string;
    isConnected: boolean;
  };
  jellyseerr: {
    enabled: boolean;
    url: string;
  };
  setupCompleted: boolean;
}

export interface UserCredentials {
  username: string;
  password: string;
}
