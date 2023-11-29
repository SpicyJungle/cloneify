import { useState, useEffect } from "react";
import type { Album } from "~/types/album";

interface SpotifyResponse {
  items: {
    added_at: string;
    album: Album;
  }[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const useSavedAlbums = (accessToken: string, limit: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState<{added_at: string; album: Album}[]>([]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const fetchPlaylists: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spotify.com/v1/me/albums?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data: SpotifyResponse = await response.json() as SpotifyResponse;

        setLoading(false);
        setAlbums(data.items);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchPlaylists().catch(() => {
      //   setError(error.message);
      setLoading(false);
    });
  }, [accessToken, limit]);

  return { albums, loading, error };
};

export default useSavedAlbums;
