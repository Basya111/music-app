import { Draggable } from 'react-beautiful-dnd';

export const SongPreview = ({ song, onRemoveSong, onChangeCurrSong, index }) => {

    var songTitle = (song.title.length > 40) ? song.title.substring(0, 41) + '...' : song.title

    return (

        <div>
        <Draggable draggableId={song.id} index={index} type="song">
            {provided => (
                <section className="song-preview flex space-between"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                    onClick={() => onChangeCurrSong(song)}>
                    <div className="flex align-center">
                        <img className="play-btn" src="https://res.cloudinary.com/basimgs/image/upload/v1618827621/play-button_ad0dxn.png" alt="" />
                        <img className="song-img" src={song.imgUrl} alt="" />
                        <p>{songTitle}</p>
                        <p>{song.duration? song.duration: '3:22'}</p>
                    </div>
                    <button className="delete-btn" onClick={(ev) => onRemoveSong(ev, song.id)} >
                        <img src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" alt="" /></button>
                </section>

            )}
        </Draggable>
        </div>
    )
}