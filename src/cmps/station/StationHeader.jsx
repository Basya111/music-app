import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      margin: '0 2px'
    }
  }));

export const StationHeader = ({ station, saveTitle, saveDesc, onToggleFav, user }) => {

    const [title, setTitle] = useState(station.name)
    const [desc, setDesc] = useState(station.description)
    const [isTitleEdit, setEditTitle] = useState(false)
    const [isDescEdit, setEditDesc] = useState(false)
    let location = useLocation()
    const classes = useStyles();
    const [isInFavorite, toggleFavorite] = useState(false)

    useEffect(() => {
        checkInFav()
    }, [])

    const onChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onChangeDesc = (ev) => {
        setDesc(ev.target.value)
    }

    const onSaveTitle = (ev) => {
        ev.preventDefault()
        saveTitle(title)
        setEditTitle(false)
    }

    const onSaveDesc = (ev) => {
        ev.preventDefault()
        saveDesc(desc)
        setEditDesc(false)
    }

    const copyUrl = () => {
        const url = location.pathname
        navigator.clipboard.writeText('http://localhost:3000' + url)
    }

    const onAddToFav = () => {
        onToggleFav()
        toggleFavorite(!isInFavorite)
    }

    const checkInFav = () => {
        if(!user) return
        const stationIdx = user.likedStation.findIndex(currStation => currStation._Id === station._id)
        if(stationIdx === -1) toggleFavorite(false)
        else toggleFavorite(true)
    }

    return (
        <section className="station-header flex space-between">
            <div className="flex">
                <img className="station-img" src={station.stationImg} alt="station-img" />
                <div className="flex column space-between">
                    {isTitleEdit && <form onSubmit={onSaveTitle}>
                        <input type="text" name="title" value={title}
                            onChange={onChange} onBlur={onSaveTitle} autoComplete="off" />
                    </form>}
                    {!isTitleEdit && <h3 onClick={() => setEditTitle(true)}>{title}</h3>}
                    {isDescEdit && <form onSubmit={onSaveDesc}>
                        <textarea name="desc" value={desc}
                            onChange={onChangeDesc} onBlur={onSaveDesc} ></textarea>
                    </form>}
                    {!isDescEdit && <p onClick={() => setEditDesc(true)}>{station.description}</p>}
                    <ul className="tags-container flex">
                        {station.tags.map((tag, idx) => {
                            return <li key={idx}>{tag}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="featur-header flex column space-between align-end">
                <button className="like-btn" onClick={onAddToFav}>
                <img src={isInFavorite? "https://res.cloudinary.com/basimgs/image/upload/v1612376637/heart_1_odahts.png" : "https://res.cloudinary.com/basimgs/image/upload/v1612376637/heart_ujzqqz.png"} alt="" />
                </button>
                <button onClick={copyUrl} className="clipboard-btn" ><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/paper-clip_cxh1su.png" alt="" /></button>
                <p>Created by: <Avatar src={station.createdBy.imgUrl || ''} className={classes.small} >G</Avatar> 
                {station.createdBy.fullname.substring(0, station.createdBy.fullname.indexOf(' '))} </p>
            </div>
        </section>
    )


}