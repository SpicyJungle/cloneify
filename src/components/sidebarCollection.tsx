import { BiVolumeFull } from "react-icons/bi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

export const SidebarCollection = ({
  collectionCover,
  collectionTitle,
  collectionType,
  collectionCreator,
  pinned,
  isPlaying,
}: {
  collectionCover: string;
  collectionTitle: string;
  collectionType: string;
  collectionCreator?: string;
  pinned?: boolean;
  isPlaying: boolean;
}) => {
  return (
    <div className="flex h-16 w-full flex-row items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded-lg hover:bg-[#1a1a1a] ">
      <div className="flex h-full w-5/6 flex-row items-center px-3">
        <div
          className={`aspect-square h-4/6 ${
            collectionType === "Artist" ? "rounded-full" : "rounded-md"
          }`}
          style={{
            backgroundImage: `url(${collectionCover})`,
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
            {collectionTitle}
          </h1>
          <h2 className="flex flex-row text-xs font-normal text-[#b3b3b3]">
            {collectionType !== "Artist" ? (
              <>
                {collectionType} <GoPrimitiveDot className="mx-1 mt-1" />
                {collectionCreator}
              </>
            ) : (
              ""
            )}
          </h2>
        </div>
      </div>
      <div>
        {isPlaying && <BiVolumeFull className="text-xl text-green-600" />}
      </div>
    </div>
  );
};
