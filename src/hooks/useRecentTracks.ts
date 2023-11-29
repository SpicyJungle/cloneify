import { useState, useEffect } from "react";
import type { Track } from "~/types/track";

interface Context {
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}

interface SpotifyResponse {
  items: {
    context: Context;
    track: Track;
    played_at: string;
  }[];
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
}

const useRecentTracks = (
  accessToken: string,
) => {
  const [items, setItems] = useState<
    { context: Context; track: Track; played_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchTracks: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spotify.com/v1/me/player/recently-played?limit=50`, // change this to tracks
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top items");
        }

        const data: SpotifyResponse = await response.json() as SpotifyResponse;

        setItems(data.items);
        setLoading(false);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchTracks().catch(() => {
      // setError(error.message);
      setLoading(false);
    });
  }, [accessToken]);

  if (!accessToken) return { items: [], loading: true, error: null };
  return { items, loading, error };
};

export default useRecentTracks;
