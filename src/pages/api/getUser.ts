import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { Playlist } from "~/types/playlist";
import { SpotifyUserProfile } from "~/types/user";

const fn = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = req.query.id as string;
  if (!session || !userId) return res.status(400).json({ error: "No session found" });

  try {
    const fetchUser = async (): Promise<SpotifyUserProfile> => {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

    //   eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res: SpotifyUserProfile = await response.json();
      return res;
    };

    const data = await fetchUser();
    res.json(data)
  } catch (error) {
    res.status(400).json(error);
  }
};

export default fn;
