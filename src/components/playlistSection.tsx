import { PlaylistCard } from "./playlistCard";

interface playlistCardInfo {
  title: string;
  description: string;
  image: string;
  key: string;
}

export const PlaylistSection = ({playlists, sectionTitle}:{playlists: playlistCardInfo[], sectionTitle: string}) => {
  return (
  <div className="playlistSection h-2/5 flex flex-col">
    <h2 className="font-bold text-2xl text-white">{sectionTitle}</h2>
    <div className="mt-2 sec flex flex-row h-full">
    {playlists.map((playlist: playlistCardInfo) => {
        return (<PlaylistCard key={playlist.key} data={playlist} />)
    })}
    </div>
  </div>
  )
};
