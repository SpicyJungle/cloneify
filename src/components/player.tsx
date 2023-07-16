import { useSession } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BiAddToQueue,
  BiDevices,
  BiExpandAlt,
  BiMicrophone,
  BiSkipNext,
  BiSkipPrevious,
  BiVolumeFull,
} from "react-icons/bi";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsRepeat,
  BsRepeat1,
  BsShuffle,
} from "react-icons/bs";
import usePlayer from "~/hooks/usePlayer";
import { ProgressBar } from "./progressBar";
import useIsCurrentTrackSaved from "~/hooks/useIsCurrentTrackSaved";
import type { Artist } from "~/types/artist";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Track } from "~/types/track";
import { useState } from "react";

interface PlayerResponse {
  device: {
    id: string;
    is_active: boolean;
    is_private_session: false;
    is_restricted: false;
    name: string;
    type: string;
    volume_percent: number;
  };
  repeat_state: "off" | "track" | "context";
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
}

type DataProps = {
  data: PlayerResponse | null;
}
export const Player: React.FC<DataProps> = ({ data }: DataProps) => {
  const { data: session } = useSession();


  const { isLiked } = useIsCurrentTrackSaved(
    session?.accessToken ?? "",
    data?.item?.id ?? ""
  );

  const progressPercentage = (100 / (data?.item?.duration_ms ?? 1)) * (data?.progress_ms ?? 0);
  const durMinutes = Math.floor((data?.item?.duration_ms ?? 0) / 1000 / 60);
  const durSeconds = Math.floor(((data?.item?.duration_ms ?? 0) / 1000) % 60);

  const progMinutes = Math.floor((data?.progress_ms ?? 0) / 1000 / 60);
  const progSeconds = Math.floor(((data?.progress_ms ?? 0) / 1000) % 60);

  const artistList = data?.item?.artists
    .map((artist: Artist) => artist.name)
    .join(", ");

  return (
    <footer className="flex h-full w-full flex-row justify-between bg-opacity-0 px-5">
      {data?.item && (
        <>
          <div className="songInfo flex h-full w-1/6 items-center py-1">
            <div
              className="aspect-square h-4/6 rounded"
              style={
                data.item.album.images[0]?.url
                  ? {
                      backgroundImage: `url(${
                        data?.item?.album.images[0]?.url ?? ""
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      backgroundColor: "#333333",
                    }
              }
            />
            <div className="ml-3 cursor-pointer">
              <h1 className="font-medium text-white hover:underline">
                {data.item.name}
              </h1>
              <h2 className="text-xs text-[#b3b3b3] hover:text-white hover:underline">
                {artistList}
              </h2>
            </div>
            <AiOutlineHeart
              className={`ml-4 text-xl ${
                isLiked ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"
              } `}
            />
          </div>
        </>
      )}
      <div className="player flex w-4/6 flex-col gap-y-3 text-white">
        <div
          className={`buttons mt-2 flex w-full flex-row items-center justify-center gap-x-3 text-xl text-[#b3b3b3]`}
        >
          <button
            className={`${`shuffle ${
              data?.shuffle_state ? "text-[#1ed760]" : "hover:text-[#eaeaea]"
            }`}`}
          >
            {" "}
            <BsShuffle />{" "}
          </button>
          <button className="previous text-3xl hover:text-[#eaeaea]">
            {" "}
            <BiSkipPrevious />{" "}
          </button>
          <button className="play text-3xl text-white hover:scale-105">
            {data?.is_playing ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
          </button>
          <button className="next text-3xl hover:text-[#eaeaea]">
            {" "}
            <BiSkipNext />{" "}
          </button>
          <button
            className={`${`repeat ${
              ["track", "context"].includes(data?.repeat_state ?? "off")
                ? "text-[#1ed760]"
                : "hover:text-[#eaeaea]"
            }`}`}
          >
            {["off", "context"].includes(data?.repeat_state ?? "off") ? (
              <BsRepeat />
            ) : (
              <BsRepeat1 />
            )}
          </button>
        </div>
        <div className="song-duration flex w-full flex-row justify-center gap-x-3 text-sm text-[#a7a7a7]">
          <span className="current-time">{`${progMinutes}:${
            progSeconds <= 9 ? `0${progSeconds}` : progSeconds
          }`}</span>
          <div className="w-4/6">
            <ProgressBar completed={progressPercentage} />
          </div>
          <span className="total-time">{`${durMinutes}:${
            durSeconds <= 9 ? `0${durSeconds}` : durSeconds
          }`}</span>
        </div>
      </div>
      <div className="controls flex h-full flex-row items-center justify-evenly gap-x-3 text-lg text-[#b3b3b3]">
        <BiMicrophone className="hover:scale-105 hover:text-white" />
        <BiAddToQueue className="hover:scale-105 hover:text-white" />
        <BiDevices className="hover:scale-105 hover:text-white" />
        <div className="volumeSlider flex flex-row">
          <BiVolumeFull className="hover:text-white" />
          <div className="ml-2 w-20">
            <ProgressBar completed={data?.device?.volume_percent ?? 100} />
          </div>
        </div>
        <BiExpandAlt className="hover:text-white" />
      </div>
    </footer>
  );
};
