import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { saveStation } from "../../store/actions/stationAction.js"
import { stationService } from "../../services/stationService";
import { SongSearchList } from "./SongSearchList";


export const SongAdd = (props) => {

    const { currStation } = useSelector(state => state.stationModule)
    const dispatch = useDispatch()
    const [txt, setTxt] = useState('')
    const [songs, setSongs] = useState(null)
    const [isInputShown, setInputShown] = useState(false)

    const onChange = async (ev) => {
        setTxt(ev.target.value)
        const getSongsDebounce = stationService.debounce(() => getSongs(txt), 3000)
        // await getSongs(txt)
        getSongsDebounce()
    }

    const getSongs = async (val) => {
        const songs =  await stationService.getSongsSearch(val)
        // console.log('songs', songs);
        setSongs(songs)
    }

    const onAddSong = (newSong) => {
        console.log('new song', newSong);
        const copyStaion = {...currStation}
        if(!copyStaion.songs.length) copyStaion.currSong = newSong
        copyStaion.songs.push(newSong)
        dispatch(saveStation(copyStaion))
    }



    return (
        <section className="add-song-container">
            <div className="flex">
            <button className={!isInputShown? 'add-btn': 'add-btn close'} onClick={()=> setInputShown(!isInputShown)} ><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt=""/></button>
            <input type="text" name="txt" value={txt} onChange={onChange} className={isInputShown ? 'show-input' : 'unshown-input'} placeholder="Search by Artist or Song name" />
            </div>
            {songs && txt && <SongSearchList songs={songs} onAddSong={onAddSong}/>}
        </section>
    )

}