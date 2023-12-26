import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { Playlist } from "~/types/playlist";
import { Track } from "~/types/track";

interface SpotifyResponse {
    items: Track[];
    href: string;
    limit: number;
    next: string;
    previous: number;
    offset: number;
    total: number;
  }

const fn = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const playlistId = req.query.id as string;
    const totalTracks = req.query.total as string;
    if (!session || !playlistId) return res.status(400).json({ error: "No session found" });
    console.log(playlistId, totalTracks)
    
    const allTracks = [];
    try {
      const fetchTracks = async (offset: number): Promise<Track[]> => {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
  
        const res: SpotifyResponse = await response.json() as SpotifyResponse;
        
        return res.items;
      };
      
      while (allTracks.length < parseInt(totalTracks)) {
        const tracks = await fetchTracks(allTracks.length);
        allTracks.push(...tracks);
      }

      res.json(allTracks)
    } catch (error) {
      res.status(400).json(error);
    }
};

export default fn;
