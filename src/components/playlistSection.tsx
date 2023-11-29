import { Playlist } from "~/types/playlist";
import { PlaylistCard } from "./playlistCard";
import React, { useEffect, useRef, useState } from 'react';
import { Artist } from "~/types/artist";
import { Album } from "~/types/album";

export const PlaylistSection = ({
  playlists,
  sectionTitle,
  isArtists
}: {
  playlists: Playlist[] | Album[] | Artist[];
  sectionTitle: string;
  isArtists: boolean;
}) => {

  const [visiblePlaylists, setVisiblePlaylists] = useState<Playlist[] | Album[] | Artist[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref to the container element

  // Recalculate on window resize
  useEffect(() => {
    const calculateVisiblePlaylists = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 170;
        const spacing = 8;
        const maxCardsPerRow = Math.floor(
          (containerWidth) / (minCardWidth + spacing)
        );
  
        setVisiblePlaylists(playlists.slice(0, maxCardsPerRow));
      }
    };

    calculateVisiblePlaylists();
    window.addEventListener('resize', calculateVisiblePlaylists);
    return () => {
      window.removeEventListener('resize', calculateVisiblePlaylists);
    };
  }, [playlists]);

  

  return ( 
    <div className="w-full">
      <h3 className="text-3xl text-white font-bold hover:underline">{sectionTitle}</h3>
      <div ref={containerRef} className="grid grid-cols-cards gap-2 mt-4">
        {visiblePlaylists.map((item) => {
          return (
            <PlaylistCard
              key={item.id}
              data={item}
            />
          );
        })}
    </div>
  </div>
  );
};
