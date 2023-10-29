export const ProgressBar = (props: {
    color?: string; // tailwind color
    width?: string; // only use fractions, e.g. 1/2, 1/3, 1/4, etc.
    height?: string; // tailwind height
}) => {
    const {
        color = "bg-white",
        width = "w-full",
        height = "h-4",
    } = props;

    return (
        <div className={`${width} ${height} ${color}`}>
        </div>
    )
}