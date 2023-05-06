interface playlistCardInfo {
    title: string;
    description: string;
    image: string;
    key: string;
}

export const PlaylistCard = ({ data }: { data: playlistCardInfo }) => {
    return <div className="playlistcard rounded-lg aspect-[3/4] p-4 bg-[#171717] hover:bg-[#282828] overflow-hidden transition-all flex flex-col">
        <img src={data.image} alt={data.title} className="rounded-lg" style={{boxShadow: `0px 8px 24px 0px rgba(0, 0, 0, 0.5)`}}/>
        <div className="playlistcard__info mt-2 break-words">
            <h3 className="font-bold text-white">{data.title}</h3>
            <p className="text-[#9c9c9c] break-words text-ellipsis whitespace-nowrap overflow-hidden h-12">{data.description}</p>
        </div>
    </div>
};
