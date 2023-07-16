import { useState, useEffect } from "react";

const useIsCurrentTrackSaved = (accessToken: string, id: string) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !accessToken) return;
    const fetchIsLiked: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`,
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
        const data: boolean[] = await response.json();

        setIsLiked(data[0]);
        setLoading(false);
      } catch (error: any) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchIsLiked().catch((error) => {
      // setError(error.message);
      setLoading(false);
    });
  }, [accessToken, id]);

  if (!accessToken || !id) return { isLiked: false, loading: true, error: null };
  return { isLiked, loading, error };
};

export default useIsCurrentTrackSaved;
