import { useState, useEffect } from "react";
import { Track } from "~/types/track";

interface PlayerResponse {
    device: {
        id: string;
        is_active: boolean;
        is_private_session: false;
        is_restricted: false;
        name: string;
        type: string;
        volume_percent: number
    };
    repeat_state: 'off' | 'track' | 'context';
    shuffle_state: boolean;
    context: {
        type: string;
        href: string;
        external_urls: {
            spotify: string;
        };
        uri: string;
    };
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: Track;
}

const usePlayer = (accessToken: string) => {
  const [repeatState, setRepeatState] = useState<'off' | 'track' | 'context'>("off");
  const [shuffleState, setShuffleState] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [track, setTrack] = useState<Track>();
  const [volumePercent, setVolumePercent] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists: () => Promise<void> = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetching user's playlists from the Spotify API
        const response = await fetch(
          `https://api.spotify.com/v1/me/player`,
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
        const data: PlayerResponse = await response.json();

        setRepeatState(data.repeat_state)
        setShuffleState(data.shuffle_state)
        setProgress(data.progress_ms)
        setIsPlaying(data.is_playing)
        setTrack(data.item)
        setVolumePercent(data.device.volume_percent)
        setLoading(false);
      } catch (error: any) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchPlaylists().catch((error) => {
      //   setError(error.message);
      setLoading(false);
    });
  }, [accessToken]);

  return { repeatState, shuffleState, progress, isPlaying, track, loading, error, volumePercent };
};

export default usePlayer;
