import { useState, useEffect } from "react";

interface Playlist {
  collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    owner: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: null;
            total: number;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}

interface SpotifyResponse {
  items: Playlist[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const useSpotifyPlaylists = (accessToken: string) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists?limit=50`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: SpotifyResponse = await response.json();

        setPlaylists(data.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (!accessToken) {
      return;
    }
    
    fetchPlaylists().catch((_error) => {
      setLoading(false);
    });
  }, [accessToken]);

  return { playlists, loading, error };
};

export default useSpotifyPlaylists;
