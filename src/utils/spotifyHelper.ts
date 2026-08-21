/**
 * Spotify URL & Embed Helper
 * Handles parsing, validation, and embed URL conversion for Spotify Tracks, Playlists, Albums, and Artists.
 */

export interface SpotifyParsedData {
  isValid: boolean;
  type: 'track' | 'playlist' | 'album' | 'artist' | null;
  id: string | null;
  embedUrl: string | null;
  originalUrl: string;
}

export interface SpotifyPreset {
  id: string;
  title: string;
  artist: string;
  category: 'romantic_indo' | 'romantic_pop' | 'instrumental' | 'traditional' | 'playlist';
  spotifyUrl: string;
  coverImage?: string;
}

/**
 * Converts any standard Spotify link or URI into an iframe-compatible embed URL.
 * Handles patterns like:
 * - https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=...
 * - https://open.spotify.com/intl-id/track/4cOdK2wGLETKBW3PvgPWqT
 * - https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
 * - spotify:track:4cOdK2wGLETKBW3PvgPWqT
 */
export function parseSpotifyUrl(inputUrl: string): SpotifyParsedData {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return {
      isValid: false,
      type: null,
      id: null,
      embedUrl: null,
      originalUrl: inputUrl || ''
    };
  }

  const trimmed = inputUrl.trim();

  // Pattern 1: URI format (e.g. spotify:track:12345, spotify:playlist:12345)
  if (trimmed.startsWith('spotify:')) {
    const parts = trimmed.split(':');
    if (parts.length >= 3) {
      const type = parts[1] as 'track' | 'playlist' | 'album' | 'artist';
      const id = parts[2];
      return {
        isValid: true,
        type,
        id,
        embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
        originalUrl: trimmed
      };
    }
  }

  // Pattern 2: HTTPS web URL (e.g. https://open.spotify.com/track/12345?si=..., https://open.spotify.com/intl-id/playlist/12345)
  try {
    const urlObj = new URL(trimmed);
    const pathname = urlObj.pathname; // e.g. "/track/12345" or "/intl-id/track/12345"
    
    // Match type and id regardless of intl prefix
    const regex = /(?:intl-[a-z]{2}\/)?(track|playlist|album|artist)\/([a-zA-Z0-9]+)/i;
    const match = pathname.match(regex);

    if (match && match[1] && match[2]) {
      const type = match[1].toLowerCase() as 'track' | 'playlist' | 'album' | 'artist';
      const id = match[2];
      return {
        isValid: true,
        type,
        id,
        embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
        originalUrl: trimmed
      };
    }
  } catch {
    // If not a valid URL, try simple regex fallback
    const fallbackRegex = /(track|playlist|album|artist)[\/:]([a-zA-Z0-9]+)/i;
    const match = trimmed.match(fallbackRegex);
    if (match && match[1] && match[2]) {
      const type = match[1].toLowerCase() as 'track' | 'playlist' | 'album' | 'artist';
      const id = match[2];
      return {
        isValid: true,
        type,
        id,
        embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
        originalUrl: trimmed
      };
    }
  }

  return {
    isValid: false,
    type: null,
    id: null,
    embedUrl: null,
    originalUrl: trimmed
  };
}

/**
 * Curated Popular Wedding Song & Playlist Presets
 */
export const POPULAR_SPOTIFY_PRESETS: SpotifyPreset[] = [
  {
    id: 'tulus-teman-hidup',
    title: 'Teman Hidup',
    artist: 'Tulus',
    category: 'romantic_indo',
    spotifyUrl: 'https://open.spotify.com/track/59iQz3E8m03Jv8aZ8dG3rD'
  },
  {
    id: 'nadhif-penjaga-hati',
    title: 'Penjaga Hati',
    artist: 'Nadhif Basalamah',
    category: 'romantic_indo',
    spotifyUrl: 'https://open.spotify.com/track/62zY95gL2fNn5wYlQ2Q8uX'
  },
  {
    id: 'kahitna-cantik',
    title: 'Cantik',
    artist: 'Kahitna',
    category: 'romantic_indo',
    spotifyUrl: 'https://open.spotify.com/track/3eXqQ3J0Z7lX4hM2z9V1yE'
  },
  {
    id: 'yovie-janji-suci',
    title: 'Janji Suci',
    artist: 'Yovie & Nuno',
    category: 'romantic_indo',
    spotifyUrl: 'https://open.spotify.com/track/1M2yB9z6rD4wV8hX0lE2qA'
  },
  {
    id: 'sal-priadi-gala-bunga',
    title: 'Gala Bunga Matahari',
    artist: 'Sal Priadi',
    category: 'romantic_indo',
    spotifyUrl: 'https://open.spotify.com/track/4lH5e2rT6gY0uK1i3oP9aZ'
  },
  {
    id: 'ed-sheeran-perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    category: 'romantic_pop',
    spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v'
  },
  {
    id: 'elvis-cant-help-falling',
    title: "Can't Help Falling in Love",
    artist: 'Kina Grannis',
    category: 'romantic_pop',
    spotifyUrl: 'https://open.spotify.com/track/6ojsoZ3z1kYc0uJ1q3R8uD'
  },
  {
    id: 'shania-twain-from-this-moment',
    title: 'From This Moment On',
    artist: 'Shania Twain',
    category: 'romantic_pop',
    spotifyUrl: 'https://open.spotify.com/track/73uA7L9Z5xG1i8qK2vD4uL'
  },
  {
    id: 'wedding-acoustic-playlist',
    title: 'Romantic Wedding Acoustic Songs',
    artist: 'Spotify Playlist',
    category: 'playlist',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
  },
  {
    id: 'gamelan-jawa-romantis',
    title: 'Kebo Giro & Gamelan Pengantin Jawa',
    artist: 'Traditional Ensemble',
    category: 'traditional',
    spotifyUrl: 'https://open.spotify.com/track/2tH7n5xY1mP0qK3vD9wE8l'
  },
  {
    id: 'piano-instrumental-wedding',
    title: 'Canon in D (Violin & Piano Romance)',
    artist: 'Pachelbel Romance Orchestra',
    category: 'instrumental',
    spotifyUrl: 'https://open.spotify.com/track/0cBPuXbY0j6j7X5xR4z9qA'
  }
];
