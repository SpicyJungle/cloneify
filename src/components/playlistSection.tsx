import { PlaylistCard } from "./playlistCard";
import React, { useEffect, useRef, useState } from 'react';

interface playlistCardInfo {
  title: string;
  description: string;
  image: string;
  key: string;
}

export const PlaylistSection = ({
  playlists,
  sectionTitle,
  isArtists
}: {
  playlists: playlistCardInfo[];
  sectionTitle: string;
  isArtists: boolean;
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxCards, setMaxCards] = useState(0);

  useEffect(() => {
    const calculateMaxCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const cardWidth = 160+25;
        const maxCards = Math.floor(containerWidth / cardWidth);
        setMaxCards(maxCards);
      }
    };

    calculateMaxCards();
    window.addEventListener("resize", calculateMaxCards);
    return () => {
      window.removeEventListener("resize", calculateMaxCards);
    }

  }, []);

  const visibleCards = playlists.slice(0, maxCards);

  return (
    <div className="">
      <h3 className="mb-2 text-white font-bold text-2xl flex flex-row justify-between"><span className="hover:underline cursor-pointer">{sectionTitle}</span> <span className=" text-sm text-[#848484] hover:underline cursor-pointer">Show all</span></h3>
      <div className="playlistSection flex flex-wrap h-2/5 flex-row gap-x-6 w-full" ref={containerRef}>
        {visibleCards.map((playlist: playlistCardInfo) => {
          return <PlaylistCard key={playlist.key} data={{...playlist, isArtists}}/>;
        })}
      </div>
    </div>
  );
};
