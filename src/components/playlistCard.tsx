import Image from "next/image";
import Link from "next/link";
import { Album } from "~/types/album";
import { Artist } from "~/types/artist";
import { Playlist } from "~/types/playlist";

export const PlaylistCard = ({ data }: { data: Playlist | Artist | Album }) => {

  let type: "playlists" | "artists" | "albums" = "playlists";
  let description = "";
  
  if ("collaborative" in data) {
    description = data.description ?? ("By" + data.owner.display_name)
  } else if ("artists" in data) {
    type = "albums";
    description = data.artists.map((artist) => artist.name).join(", ");
  } else {
    description = "";
    type = "artists"
  }
  const fallbackImage =
    "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <Link className={`playlistcard h-64 overflow-hidden text-ellipsis rounded-lg bg-[#171717] p-4 transition-all hover:bg-[#282828] w-full`} href={`/${type}/${data.id}`}>
      <Image src={data.images?.[0]?.url ?? fallbackImage} alt="Playlist Cover" className={`${type == "artists" ? "rounded-full" : "rounded-md"} shadow-lg w-full object-cover aspect-square`} width={0} height={0} sizes="100vw"/>
      <h3 className="text-white text-base font-bold mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{data.name}</h3>
      <p className="text-[#b3b3b3] text-xs mt-1 text-ellipsis overflow-hidden whitespace-nowrap" title={description}>{description}</p>
    </Link>
  );
};
