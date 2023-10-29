import Image from "next/image";

interface playlistCardInfo {
  title: string;
  description: string;
  image: string;
  key: string;
  isArtists?: boolean;
}

export const PlaylistCard = ({ data }: { data: playlistCardInfo }) => {
  const { image, isArtists, title, description } = data;
  return (
    <div className={`playlistcard h-64 overflow-hidden text-ellipsis rounded-lg bg-[#171717] p-4 transition-all hover:bg-[#282828] w-full`}>
      <Image src={image} alt="Playlist Cover" className={`${isArtists ? "rounded-full" : "rounded-md"} shadow-lg w-full object-cover aspect-square`} width={0} height={0} sizes="100vw"/>
      <h3 className="text-white text-base font-bold mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{title}</h3>
      <p className="text-[#b3b3b3] text-xs mt-1 text-ellipsis overflow-hidden whitespace-nowrap" title={description}>{description}</p>
    </div>
  );
};
