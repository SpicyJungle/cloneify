interface playlistCardInfo {
  title: string;
  description: string;
  image: string;
  key: string;
  isArtists?: boolean;
}

export const PlaylistCard = ({ data }: { data: playlistCardInfo }) => {
  return (
    <div className="playlistcard h-60 overflow-hidden text-ellipsis rounded-lg bg-[#171717] p-4 transition-all hover:bg-[#282828]">
      <div className="flex flex-col gap-y-2">
        <div
          className={`playlistcard__image h-32 w-32 bg-red-500 ${data.isArtists ? "rounded-full" : "rounded-lg"}`}
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            boxShadow: `0px 8px 24px 0px rgba(0,0,0,0.5)`,

          }}
        />

        <div className="h-28 text-ellipsis">
          <h3 className="font-bold text-white w-32 overflow-hidden text-ellipsis">{data.title}</h3>
          <p className="w-32 text-sm text-[#9c9c9c]">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
