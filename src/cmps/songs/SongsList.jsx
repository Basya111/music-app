import { SongPreview } from "./SongPreview"
import { Droppable } from 'react-beautiful-dnd'

export const SongsList = ({ songs, onRemoveSong, onChangeCurrSong }) => {

    return (

        <div>
            <Droppable droppableId="songs" >
                {provided => (
                    <section className="song-list" ref={provided.innerRef} {...provided.droppableProps}>
                        {songs.map((song, index) => {
                            return <SongPreview song={song} key={song.id} index={index}
                                onRemoveSong={onRemoveSong} onChangeCurrSong={onChangeCurrSong} />
                        })}
                        {provided.placeholder}
                    </section>

                )}
            </Droppable>
        </div>
    )
}