import { useState, useEffect } from "react";
import type { Artist } from "~/types/artist";

interface SpotifyResponse {
  artists: {
    items: Artist[];
    href: string;
    limit: number;
    next: string;
    cursors: {
      after: string;
      before: string;
    };
    total: number;
  };
}

const useSpotifyPlaylists = (accessToken: string) => {
  const [response, setResponse] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch artists");
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: SpotifyResponse = await response.json();

        setResponse(data.artists.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPlaylists().catch((_error) => {
      setLoading(false);
    });
  }, [accessToken]);

  return { response, loading, error };
};

export default useSpotifyPlaylists;
