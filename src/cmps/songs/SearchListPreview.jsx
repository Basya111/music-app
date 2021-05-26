export const SearchListPreview = ({ song, onAddSong }) => {

    const { title, imgUrl } = song
    var songTitle = (title.length > 40) ? title.substring(0, 41) + '...' : title

    return (
        <div className="search-priview flex" onClick={() => onAddSong(song)}>
            <img src={imgUrl} alt="" />
            <p>{songTitle}</p>
        </div>
    )
}