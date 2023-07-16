import { useState, useEffect } from "react";

interface Item {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface SpotifyResponse {
  items: Item[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const useTopItems = (accessToken: string, type: 'tracks' | 'artists', amount: number) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("fetching top items")
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/${type}?limit=${amount}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top items");
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: SpotifyResponse = await response.json();
        console.log(data)

        setItems(data.items);
        setLoading(false);
      } catch (error: any) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchPlaylists().catch((error) => {
      // setError(error.message);
      setLoading(false);
    });
  }, [accessToken, type, amount]);

  if (!accessToken) return { items: [], loading: true, error: null };
  return { items, loading, error };
};

export default useTopItems;
