import { useEffect, useRef, useState } from "react"
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { utilService } from "../../services/utilService"
import { useDispatch, useSelector } from "react-redux"
import { saveStation } from "../../store/actions/stationAction.js"
import { stationService } from "../../services/stationService"

export const Player = (props) => {

    const { currStation } = useSelector(state => state.stationModule)
    const dispatch = useDispatch()
    const [videoId, setVideoId] = useState(null)

    const [playing, setPlaying] = useState(false)
    const [played, setPlayed] = useState(0)
    const [secPlayed, setSecPlayed] = useState('0:00')
    const [duration, setDuration] = useState(null)
    const [volume, setVolume] = useState(0.8)
    const [muted, setMute] = useState(false)
    // const [isVideoShown] = useState(false)
    const rangeRef = useRef(null)

    useEffect(() => {
        // const videoId = currStation ? (currStation.currSong ?
        //     currStation.currSong?.id : 'RCMXO9sBIcU') : currStation.songs[0].id
        const videoId = getVideoId()
        setVideoId(videoId)
        setPlaying(true)
    }, [currStation])

    const getVideoId = () => {
        if(!currStation) return 'RCMXO9sBIcU'
        if(!currStation.currSong){
            if(!currStation.songs[0]) return 'RCMXO9sBIcU'
            return currStation.songs[0].id
        }
        return currStation.currSong.id
    }

    const onTogglePlaye = () => {
        setPlaying(!playing)
    }

    const onGetDuration = (val) => {
        const songLength = utilService.formatSecToMin(val)
        setDuration(songLength)
    }

    const onGetProgress = (val) => {
        const playedSeconds = utilService.formatSecToMin(val.playedSeconds)
        setSecPlayed(playedSeconds)
        setPlayed(val.played)
        if ((val.played).toFixed(3) > 0.999) onPlayNext()

    }

    const onChange = (ev) => {
        setPlayed(ev.target.value)
        rangeRef.current.player.seekTo(parseFloat(ev.target.value))
    }

    const handleVolumeChange = (ev) => {
        setVolume(parseFloat(ev.target.value))
    }

    const handleToggleMuted = () => {
        setMute(!muted)
    }

    const onPlayNext = () => {
        if(!currStation.songs.length) return
        const songId = currStation.currSong.id
        let songIdx = stationService.getSongIdxById(currStation, songId)
        const copyStaion = { ...currStation }
        if (songIdx + 1 > currStation.songs.length - 1) songIdx = -1
        copyStaion.currSong = copyStaion.songs[songIdx + 1]
        dispatch(saveStation(copyStaion))
    }

    const onChangeSong = (diff) => {
        console.log(currStation.currSong);
        const songId = currStation.currSong.id
        const songIdx = stationService.getSongIdxById(currStation, songId)
        let nextSongIdx = songIdx + diff
        console.log('index', nextSongIdx, 'lenght', currStation.songs.length);
        if (nextSongIdx > currStation.songs.length - 1) nextSongIdx = 0
        else if (nextSongIdx < 0) nextSongIdx = currStation.songs.length - 1
        console.log('next index', nextSongIdx);
        const copyStaion = { ...currStation }
        copyStaion.currSong = copyStaion.songs[nextSongIdx]
        dispatch(saveStation(copyStaion))

    }

    const btnSrc = (playing) ? 'https://res.cloudinary.com/basimgs/image/upload/v1620051792/pause_yzd9zg.png' :
        'https://res.cloudinary.com/basimgs/image/upload/v1620051753/play_1_h0zqjn.png'
    const muteBtn = (muted) ? 'https://res.cloudinary.com/basimgs/image/upload/v1618827621/mute_jsvhyj.png' :
        'https://res.cloudinary.com/basimgs/image/upload/v1618827631/volume_1_qjxysa.png'
    var bgcSrc = (playing) ? 'https://res.cloudinary.com/basimgs/image/upload/v1620061559/fast-gif_vuaben.gif' :
        'https://res.cloudinary.com/basimgs/image/upload/v1620062380/very-slow_fcscd6.gif'

    if (!currStation) return <div>Loading...</div>
    return (
        <section className="audio-player"
            style={{ backgroundImage: `url(${bgcSrc})` }}
        >
            <div id="player">
                <ReactPlayer
                    ref={rangeRef}
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    onDuration={onGetDuration}
                    onProgress={onGetProgress}
                />
            </div>
            <div className="player-song-prev flex">
                <img src={currStation.currSong?.imgUrl} alt="" />
                {currStation.currSong && <p>{(currStation.currSong?.title.length > 50) ? currStation.currSong.title.substring(0, 51) + '...' :
                    currStation.currSong.title}</p>}
            </div>
            <div className="song-handle flex">
                <div className="progress flex" >
                    <p>{secPlayed}</p>
                    <input className="song-progress" type="range" min="0" max="0.99999" step="any" value={played}
                        onChange={onChange}
                    />
                    <p>{duration}</p>
                </div>
                <div className="player-control">
                    <button className="next-btn" onClick={() => onChangeSong(-1)} >
                        <img src="https://res.cloudinary.com/basimgs/image/upload/v1618827620/previous_ktarnr.png" alt="" />
                    </button>
                    <button className="play-btn" onClick={onTogglePlaye}><img src={btnSrc} alt="" /></button>
                    <button className="next-btn" onClick={() => onChangeSong(1)} >
                        <img src="https://res.cloudinary.com/basimgs/image/upload/v1618827621/next_1_t34to7.png" alt="" />
                    </button>
                </div>
                <div className="volume-prop flex">
                    <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} className="volume" />
                    <label htmlFor="muted">
                        <img src={muteBtn} className="mute-btn" alt="" /></label>
                    <input id='muted' type='checkbox' checked={muted} onChange={handleToggleMuted} hidden />
                </div>
            </div>
        </section>
    )
}