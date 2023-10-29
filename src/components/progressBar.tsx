export const ProgressBar = (props: {
    completed: number;
}) => {
    const {
        completed
    } = props;

    return (
        <div className=" h-1 w-full mt-2 bg-zinc-500 rounded-full group">
            <div className={`h-full bg-white rounded-full text-right group-hover:bg-spotifyGreen flex justify-end transition-all`}  style={{
                width: `${completed}%`
            }}>
                <div className={`rounded-full bg-white h-3 w-3 invisible group-hover:visible self-center transition-all`}></div>
            </div>
        </div>
    )
}