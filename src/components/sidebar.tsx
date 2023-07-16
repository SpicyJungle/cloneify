/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FaHome, FaSearch } from "react-icons/fa";
import { BiLibrary, BiPlus, BiX } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { SidebarCollection } from "./sidebarCollection";
import { useSession } from "next-auth/react";
import useSpotifyPlaylists from "~/hooks/useSpotifyPlaylists";
import useSavedAlbums from "~/hooks/useSavedAlbums";
import useFollowedArtists from "~/hooks/useFollowedArtists";
import type { Artist } from "~/types/artist";
import type { Album } from "~/types/album";
import { useState } from "react";
import type { PlayerResponse } from "~/types/PlayerResponse";

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: null;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

type DataProps = {
  data: PlayerResponse | null;
};

export const Sidebar: React.FC<DataProps> = ({ data }: DataProps) => {
  const { data: session } = useSession();
  const playlists: { playlists: Playlist[]; loading: boolean; error: unknown } =
    useSpotifyPlaylists(session?.accessToken ?? "");
  const albums = useSavedAlbums(session?.accessToken ?? "", 50);
  const followedArtists = useFollowedArtists(session?.accessToken ?? "");

  const masterPills = ["Playlists", "Artists", "Albums", "Downloaded"];
  const [pills, setPills] = useState(masterPills);
  const [selectedPills, setSelectedPills] = useState<string[]>([]);

  const allItems = [
    ...playlists.playlists,
    ...albums.albums,
    ...followedArtists.response,
  ];

  const filteredItems = allItems.filter((item) => {
    if (selectedPills.includes("Playlists")) {
      return "tracks" in item;
    }

    if (selectedPills.includes("Artists")) {
      return "followers" in item;
    }

    if (selectedPills.includes("Albums")) {
      return "album" in item;
    }
    return true;
  });

  const handlePillUpdate = (pill: string) => {
    // Since only one masterpill can be enabled at a time, if a selected masterpill is clicked it should reset
    if (masterPills.includes(pill) && selectedPills.includes(pill)) {
      setSelectedPills([]);
      setPills(masterPills);

      return;
    }

    if (pill === "Playlists" && selectedPills.includes(pill)) {
      setPills(masterPills);
      setSelectedPills([]);

      return;
    }

    if (masterPills.includes(pill) && !selectedPills.includes(pill)) {
      setSelectedPills([pill]);
      if (pill === "Playlists") {
        setPills(["Playlists", "By You", "By Spotify"]);
      }

      return;
    }

    if (selectedPills.includes(pill)) {
      setSelectedPills(
        selectedPills.filter((selectedPill) => selectedPill !== pill)
      );

      return;
    }

    setSelectedPills(
      [...selectedPills, pill].filter((p) => p === pill || p === "Playlists")
    );
  };

  return (
    <div className="flex h-full max-h-full w-1/4 bg-black text-lg">
      <div className="flex h-full max-h-full w-full flex-col gap-y-2 text-white">
        <ul className="flex h-min w-full flex-col gap-y-5 rounded-lg bg-[#121212] p-4 font-semibold text-[#b3b3b3]">
          <li className="hover:text-white">
            <a className="flex flex-row">
              <FaHome className="mr-4 mt-1" /> Home{" "}
            </a>
          </li>
          <li className="flex flex-row hover:text-white">
            <FaSearch className="mr-4 mt-1" /> Search{" "}
          </li>
        </ul>

        <div className="flex h-full w-full flex-col gap-y-5 overflow-y-hidden rounded-lg bg-[#121212] p-4 font-semibold text-[#b3b3b3]">
          <div className="flex flex-row justify-between">
            <a className="flex flex-row hover:text-white">
              <BiLibrary className="mr-4 mt-1 " /> Your Library
            </a>
            <div className="flex flex-row text-xl">
              <BiPlus className="mr-2 aspect-square h-full w-auto rounded-full hover:bg-[#191919] hover:text-white" />
              <BsArrowRight className="mr-2 aspect-square h-full w-auto rounded-full hover:bg-[#191919] hover:text-white" />
            </div>
          </div>
          <div className="pills flex flex-row gap-x-3 text-sm font-normal text-white">
            <button
              className={`rounded-full bg-[#232323] p-1 text-[#6a6a6a] hover:bg-[#2a2a2a] ${
                selectedPills.length === 0 ? "hidden" : ""
              } transition-all`}
              onClick={() => {
                setPills(masterPills);
                setSelectedPills([]);
              }}
            >
              <BiX className="text-3xl" />
            </button>

            {pills.map((pill) => {
              return (
                <button
                  key={pill}
                  onClick={() => handlePillUpdate(pill)}
                  className={`flex flex-row items-center justify-center truncate rounded-full p-2 px-3 transition-all ${
                    selectedPills.includes(pill)
                      ? "bg-white text-black"
                      : "bg-[#232323] hover:bg-[#2a2a2a]"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
          <div className="search flex flex-row justify-between">
            <FaSearch className="text-md aspect-square h-full w-auto rounded-full hover:bg-[#191919] hover:text-white" />
            <span className="flex flex-row text-base font-normal hover:text-white">
              Recents <IoMdArrowDropdown className="ml-2 h-full text-2xl" />{" "}
            </span>
          </div>
          <div className="collectionScroller h-full overflow-y-scroll rounded-lg bg-[#101010] w-full">
            <div className="collectionlist flex flex-col">
              {filteredItems &&
                filteredItems.map(
                  (
                    item: Playlist | { added_at: string; album: Album } | Artist
                  ) => {
                    if ("tracks" in item) {

                      return (
                        <SidebarCollection
                          key={item.id}
                          collectionTitle={item.name}
                          collectionCreator={item.owner.display_name}
                          collectionCover={item.images[0]?.url ?? ""}
                          collectionType="Playlist"
                          isPlaying={data?.context.href === item.href}
                        />
                      );
                    }
                    if ("added_at" in item) {
                      return (
                        <SidebarCollection
                          key={item.album.id}
                          collectionTitle={item.album.name}
                          collectionCreator={item.album.artists[0]?.name ?? ""}
                          collectionCover={item.album.images[0]?.url ?? ""}
                          collectionType="Album"
                          isPlaying={data?.context.href === item.album.href}
                        />
                      );
                    }
                    if ("followers" in item) {
                      return (
                        <SidebarCollection
                          key={item.id}
                          collectionTitle={item.name}
                          collectionCover={item.images[0]?.url ?? ""}
                          collectionType="Artist"
                          isPlaying={data?.context.href === item.href}
                        />
                      );
                    }
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" /> */
}
