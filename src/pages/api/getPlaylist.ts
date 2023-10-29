import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { Playlist } from "~/types/playlist";

const fn = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const playlistId = req.query.id as string;
  if (!session || !playlistId) return res.status(400).json({ error: "No session found" });

  try {
    const fetchPlaylists = async (): Promise<Playlist> => {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playlist");
      }

    //   eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res: Playlist = await response.json();
      return res;
    };

    const data = await fetchPlaylists();
    res.json(data)
  } catch (error) {
    res.status(400).json(error);
  }
};

export default fn;
