import { SearchListPreview } from "./SearchListPreview"

export const  SongSearchList = ({songs, onAddSong}) => {

    return(
        <div className="search-list">
            {songs.map(song => {
                return <SearchListPreview song={song} key={song.id} onAddSong={onAddSong}/>
            })}
        </div>
    )
}