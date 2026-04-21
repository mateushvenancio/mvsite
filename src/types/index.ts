export interface SpotifyTrack {
  rank: number;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  spotifyUrl?: string;
}

export interface Game {
  title: string;
  genre: string;
  year?: number;
  description?: string;
  coverUrl?: string;
  rating?: number; // 1-5
  status: 'playing' | 'completed' | 'dropped' | 'wishlist';
  platform?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date string
  tags: string[];
  readingTimeMinutes?: number;
  url?: string; // external link if not hosted here
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter' | 'website';
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location?: string;
  socialLinks: SocialLink[];
  topTracks: SpotifyTrack[];
  games: Game[];
  articles: Article[];
}
