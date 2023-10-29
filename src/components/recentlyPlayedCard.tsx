import { BiPlay } from "react-icons/bi";

interface playlistCardInfo {
  title: string;
  image: string;
}

export const RecentlyPlayedCard = ({ data }: { data: playlistCardInfo }) => {
  return (
    <div className="flex h-20 w-full flex-row rounded-md bg-recentlyPlayed hover:bg-recentlyPlayedHover align-middle transition-colors">
      <div
        className="mr-2 aspect-square h-full w-auto rounded-bl-md rounded-tl-md"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "5px 0 10px rgba(0, 0, 0, 0.3)",
        }}
      />
      <div className=" transition-all group flex w-11/12 h-full flex-row justify-between overflow-hidden p-2 items-center font-bold text-white">
        <p>{data.title}</p>
        <div className="transition-all opacity-0 aspect-square h-3/4 w-auto justify-center rounded-full bg-spotifyGreen text-center align-middle group-hover:opacity-100 hover:scale-110" style={{
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
        }}>
          <div className="h-full w-full flex justify-center items-center">
            <BiPlay className="text-4xl text-black ml-1 " />
          </div>
        </div>
      </div>
    </div>
  );
};
