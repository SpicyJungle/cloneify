import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";
import { BiLibrary, BiHeartSquare, BiPlus } from "react-icons/bi";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { SidebarCollection } from "./sidebarCollection";

export const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full max-h-full w-fit bg-black text-lg">
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

        <div className="flex w-full flex-col gap-y-5 overflow-y-hidden rounded-lg bg-[#121212] p-4 font-semibold text-[#b3b3b3]">
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
            <button className="flex flex-row items-center justify-center truncate rounded-full bg-[#222222] p-2 px-3">
              {" "}
              Playlists{" "}
            </button>
            <button className="flex flex-row items-center justify-center truncate rounded-full bg-[#222222] p-2 px-3">
              {" "}
              Artists{" "}
            </button>
            <button className="flex flex-row items-center justify-center truncate rounded-full bg-[#222222] p-2 px-3">
              {" "}
              Albums{" "}
            </button>
            <button className="flex flex-row items-center justify-center truncate rounded-full bg-[#222222] p-2 px-3">
              {" "}
              Podcasts & Shows{" "}
            </button>
          </div>
          <div className="search flex flex-row justify-between">
            <FaSearch className="text-md aspect-square h-full w-auto rounded-full hover:bg-[#191919] hover:text-white" />
            <span className="flex flex-row text-base font-normal hover:text-white">
              Recents <IoMdArrowDropdown className="ml-2 h-full text-2xl" />{" "}
            </span>
          </div>
          <div className="overflow-y-scroll collectionScroller rounded-lg bg-[#101010]">
            <div className="collectionlist flex flex-col ">
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" pinned={true}/>
              <SidebarCollection collectionTitle="Album Name" collectionCreator="Marius" collectionType="Album" pinned={true}/>
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
              <SidebarCollection collectionTitle="Playlist Title" collectionCreator="marius" collectionType="Playlist" />
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
