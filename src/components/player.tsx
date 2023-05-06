import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BiAddToQueue,
  BiDevices,
  BiExpand,
  BiExpandAlt,
  BiFullscreen,
  BiMicrophone,
  BiPause,
  BiPauseCircle,
  BiRepeat,
  BiSkipNext,
  BiSkipPrevious,
  BiSpeaker,
  BiVolume,
  BiVolumeFull,
} from "react-icons/bi";
import {
  BsFillPauseCircleFill,
  BsFullscreen,
  BsRepeat,
  BsRepeat1,
  BsShuffle,
} from "react-icons/bs";
import { useState } from "react";

export const Player: React.FC = () => {
  const { data: session } = useSession();

  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatState, setRepeatState] = useState(0);
  const repeatStates = ["off", "repeat", "repeat-one"];

  const handleRepeatClick = () => {
    setRepeatState((repeatState + 1) % repeatStates.length);
  };

  return (
    <footer className="flex h-full w-full flex-row justify-between bg-black px-5">
      <div className="songInfo flex h-full w-1/6 items-center py-1">
        <div className="aspect-square h-4/6 rounded bg-gradient-to-r from-orange-500 from-10% to-rose-700 to-90%" />
        <div className="ml-3">
          <h1 className="font-medium text-white hover:underline">Song Name</h1>
          <h2 className="text-xs text-[#b3b3b3] hover:text-white hover:underline">
            Artist Name
          </h2>
        </div>
        <AiOutlineHeart
          className={`ml-4 text-xl ${
            isLiked ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"
          } `}
          onClick={() => setIsLiked(!isLiked)}
        />
      </div>
      <div className="player flex w-4/6 flex-col gap-y-3 text-white">
        <div
          className={`buttons mt-2 flex w-full flex-row items-center justify-center gap-x-3 text-xl text-[#b3b3b3]`}
        >
          <button
            className={`${`shuffle ${
              isShuffle ? "text-[#1ed760]" : "hover:text-[#eaeaea]"
            }`}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            {" "}
            <BsShuffle />{" "}
          </button>
          <button className="previous text-3xl hover:text-[#eaeaea]">
            {" "}
            <BiSkipPrevious />{" "}
          </button>
          <button className="play text-3xl text-white hover:scale-105">
            {" "}
            <BsFillPauseCircleFill />{" "}
          </button>
          <button className="next text-3xl hover:text-[#eaeaea]">
            {" "}
            <BiSkipNext />{" "}
          </button>
          <button
            className={`${`repeat ${
              [1, 2].includes(repeatState) ? "text-[#1ed760]" : "hover:text-[#eaeaea]"
            }`}`}
            onClick={() => handleRepeatClick()}
          >
            {
                [0, 1].includes(repeatState) ? <BsRepeat /> : <BsRepeat1 />
            }
          </button>
        </div>
        <div className="song-duration flex w-full flex-row justify-center gap-x-3 text-sm text-[#a7a7a7]">
          <span className="current-time">0:00</span>
          <div className="progress-bar mt-2 h-1 w-3/6 rounded-lg bg-[#4d4d4d]" />
          <span className="total-time">4:44</span>
        </div>
      </div>
      <div className="controls flex h-full flex-row items-center justify-evenly gap-x-3 text-lg text-[#b3b3b3]">
        <BiMicrophone className="hover:scale-105 hover:text-white" />
        <BiAddToQueue className="hover:scale-105 hover:text-white" />
        <BiDevices className="hover:scale-105 hover:text-white" />
        <div className="volumeSlider flex flex-row">
          <BiVolumeFull className="hover:text-white" />
          <div className="ml-2 mt-2 h-1 w-20 rounded-lg bg-white"></div>
        </div>
        <BiExpandAlt className="hover:text-white" />
      </div>
    </footer>
  );
};
