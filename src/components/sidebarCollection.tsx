import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

export const SidebarCollection = ({
  collectionCover,
  collectionTitle,
  collectionType,
  collectionCreator,
  pinned,
}: any) => {
  return (
    <div className="h-16 w-full flex flex-row items-center hover:bg-[#1a1a1a] px-3 rounded-lg">
      <div className="aspect-square h-4/6 rounded bg-gradient-to-r from-orange-500 from-10% to-rose-700 to-90%" />
        <div className="flex flex-col ml-5">
            <h1 className="text-white font-normal -mt-3">{collectionTitle}</h1>
            <h2 className="text-[#b3b3b3] text-xs font-normal flex flex-row">{pinned && <BsPinAngleFill className="mt-1 mr-2 text-[#1ed760]"/>}  {collectionType} <GoPrimitiveDot className="mt-1 mx-1"/> {collectionCreator}</h2>
        </div>
    </div>
  );
};
