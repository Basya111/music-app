import { useEffect, useState } from 'react'
import { StationHeader } from '../cmps/station/StationHeader'
import { SongsList } from '../cmps/songs/SongsList'
import { SongAdd } from '../cmps/songs/SongAdd'
import { loadStation, saveStation } from "../store/actions/stationAction.js"
import { saveUser } from "../store/actions/userAction"
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Chat } from '../cmps/chat/Chat'

export const StationPage = ({ match, history }) => {

    // const [station, setStation] = useState('')
    const { currStation } = useSelector(state => state.stationModule)
    const { loggedInUser } = useSelector(state => state.userModule)
    // const [chatMsg, setChatMsg] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getStation()

    }, [match.params])

    const getStation = () => {
        const { stationId } = match.params
        dispatch(loadStation(stationId))
    };

    const onRemoveSong = (ev, songId) => {
        ev.stopPropagation()
        console.log('removeing...');
        var copyStaion = { ...currStation }
        const filterdSongs = copyStaion.songs.filter(song => song.id !== songId)
        copyStaion.songs = filterdSongs
        dispatch(saveStation(copyStaion))
    }

    const onChangeCurrSong = (song) => {
        console.log('curr song is', song.title);
        var copyStaion = { ...currStation }
        copyStaion.currSong = song
        dispatch(saveStation(copyStaion))
    }

    const saveTitle = (title) => {
        const copyStaion = { ...currStation }
        copyStaion.name = title
        dispatch(saveStation(copyStaion))
    }

    const saveDesc = (desc) => {
        const copyStaion = { ...currStation }
        copyStaion.description = desc
        dispatch(saveStation(copyStaion))
    }

    const onToggleFav = () => {
        if (!loggedInUser) return
        const copyUser = { ...loggedInUser }
        const stationIdx = copyUser.likedStation.findIndex(station => station._id === currStation._id)
        if(stationIdx === -1) {
            copyUser.likedStation = [...copyUser.likedStation, currStation]
        } else {
            const stations = copyUser.likedStation.filter(station => station._id !== currStation._id)
            copyUser.likedStation = [...stations]
        }
        dispatch(saveUser(copyUser))
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        const { songs } = currStation
        if (!destination) return
        const dragSong = songs.find(song => song.id === draggableId)
        songs.splice(source.index, 1)
        songs.splice(destination.index, 0, dragSong)
        const copyStaion = { ...currStation }
        copyStaion.songs = songs
        dispatch(saveStation(copyStaion))
    }



    if (!currStation) return <div>Loading...</div>
    // console.log(currStation.songs);
    return (

        // workss
        <div className="station-page">
            <StationHeader station={currStation} saveTitle={saveTitle} saveDesc={saveDesc} onToggleFav={onToggleFav} user={loggedInUser}/>
            <div className="songs-container flex">
                <div >
                    <DragDropContext onDragEnd={onDragEnd}>
                        {currStation && <SongsList songs={currStation.songs}
                            onRemoveSong={onRemoveSong} onChangeCurrSong={onChangeCurrSong} />}
                    </DragDropContext>
                </div>
                <SongAdd />
            </div>
            <Chat stationId={currStation._id} />
        </div>

    )
}

