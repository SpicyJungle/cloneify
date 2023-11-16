import Link from "next/link";
import { BiVolumeFull } from "react-icons/bi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { Album } from "~/types/album";
import { Artist } from "~/types/artist";
import { Playlist } from "~/types/playlist";

export const SidebarCollection = ({
  collection,
  collectionType,
  pinned,
  isPlaying,
}: {
  collection: Playlist | { added_at: string; album: Album } | Artist;
  collectionType: string;
  pinned?: boolean;
  isPlaying: boolean;
}) => {
  const cover = ("added_at" in collection ? collection.album?.images[0]?.url : collection.images[0]?.url) ?? "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
  const title = ("added_at" in collection ? collection.album?.name : collection.name) ?? "Unknown";
  const creator = ("added_at" in collection ? collection.album?.artists[0]?.name : "collaborative" in collection ? collection.owner.display_name : collection.name) ?? "Unknown";

  const url = ("added_at" in collection ? `/albums/${collection.album.id}` : `/playlists/${collection.id}`) ?? "/playlists/Unknown";
  return (
    <Link href={url}>
    <div className={`flex h-16 w-full flex-row items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-white ${isPlaying ? " hover:bg-opacity-20 bg-opacity-10" : "hover:bg-opacity-5 bg-opacity-0"}`}>
      <div className="flex h-full w-5/6 flex-row items-center px-3">
        <div
          className={`aspect-square h-4/6 ${
            collectionType === "Artist" ? "rounded-full" : "rounded-md"
          }`}
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          />
        <div className="ml-5 flex w-5/6 flex-col">
          <h1
            className={`-mt-3 overflow-hidden text-ellipsis font-normal ${
              isPlaying ? "text-green-600" : "text-white"
            }`}
            >
            {title}
          </h1>
          <h2 className="flex flex-row text-xs font-normal text-[#b3b3b3]">
            {collectionType !== "Artist" ? (
              <>
                {collectionType} <GoPrimitiveDot className="mx-1 mt-1" />
                {creator}
              </>
            ) : (
              ""
              )}
          </h2>
        </div>
      </div>
      <div>
        {isPlaying && <BiVolumeFull className="text-xl text-green-600 mr-4" />}
      </div>
    </div>
  </Link>
  );
};
