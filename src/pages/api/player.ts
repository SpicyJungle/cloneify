import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "~/server/auth";
import type { Track } from "~/types/track";

interface PlayerResponse {
  device: {
    id: string;
    is_active: boolean;
    is_private_session: false;
    is_restricted: false;
    name: string;
    type: string;
    volume_percent: number;
  };
  repeat_state: "off" | "track" | "context";
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

const fn = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(400).json({ error: "No session found" });

  try {
    const fetchPlaylists = async (): Promise<PlayerResponse> => {
      const response = await fetch(`https://api.spotify.com/v1/me/player`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const res: PlayerResponse = await response.json();
      console.log("resjson done")
      return res;
    };

    const data = await fetchPlaylists();
    res.json(data)
  } catch (error) {
    res.status(400).json(error);
  }
};

export default fn;
