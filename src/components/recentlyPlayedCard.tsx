import { BiPlay } from "react-icons/bi";

interface playlistCardInfo {
  title: string;
  image: string;
}

export const RecentlyPlayedCard = ({ data }: { data: playlistCardInfo }) => {
  return (
    <div className="flex h-16 w-full flex-row rounded-sm bg-zinc-400 bg-opacity-30 align-middle">
      <div
        className="mr-2 aspect-square h-full w-auto rounded-bl-sm rounded-tl-sm"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "5px 0 10px rgba(0, 0, 0, 0.3)",
        }}
      />
      <div className="group flex w-11/12 flex-row justify-between overflow-hidden p-2 text-left align-middle font-bold text-white">
        <p className="">{data.title}</p>
        <div className="invisible aspect-square h-full w-auto justify-center rounded-full bg-green-500 text-center align-middle group-hover:visible" style={{
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
        }}>
          <div className="h-full w-full flex justify-center mt-1">
            <BiPlay className="text-4xl text-black mt-px" />
          </div>
        </div>
      </div>
    </div>
  );
};
