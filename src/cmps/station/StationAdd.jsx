import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { stationService } from '../../services/stationService';
import { MultipleSelect } from './MultiSelect';
import { makeStyles } from '@material-ui/core';
import { UploadImg } from './UploadImg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '38ch',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  imgContainer: {
    textAlign: 'center',
    margin: 'auto',
    width: '260px'
  },
  noImg: {
    margin: 'auto',
    width: '60px'
  }
}));

export const StationAdd = ({ addStation, loggedInUser }) => {

  const [open, setOpen] = useState(false);
  const [station, setStation] = useState(null)
  const [stationImg, setImg] = useState(null)
  const classes = useStyles();

  useEffect(() => {
    const station = loadStation()
    setStation(station)

  }, [])

  const loadStation = () => {
    return stationService.getEmptyStation()
  }

  const handleChange = (ev) => {
    const name = ev.target.name
    const value = ev.target.value
    setStation(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  const addTags = (tags) => {
    station.tags = tags
    setStation(station)
  }

  const addStationImg = (imgUrl) => {
    setImg(imgUrl)
    station.stationImg = imgUrl
    setStation(station)
  }

  const onAddStation = (ev) => {
    ev.preventDefault()
    const copyStation = {...station}
    copyStation.createdBy = (loggedInUser) ? {_id: loggedInUser._id, fullname: loggedInUser.fullname} : 'Guest'
    addStation(copyStation)
    const emptyStation = stationService.getEmptyStation()
    setStation(emptyStation)
    setImg(null)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setImg(null)
    const emptyStation = stationService.getEmptyStation()
    setStation(emptyStation)
  }



  if (!station) return <div>Loading new station</div>
  return (
    <div className="station-add">
      <button className="cta-btn" onClick={handleClickOpen}>
        Create Station
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Station</DialogTitle>
        <DialogContent>
          <div className={classes.imgContainer} >
            {!stationImg && <img className={classes.noImg} src="https://res.cloudinary.com/basimgs/image/upload/v1619939852/image-gallery_gt7xli.png" alt="" />}
            {stationImg && <img src={stationImg} alt="" />}
          </div>
          <form onSubmit={onAddStation} className={classes.root}>
            <TextField id="standard-basic" type="name" value={station.name} name="name" onChange={handleChange} label="Station name" />
            <TextField id="outlined-multiline-static" variant="outlined" rows={4}
              name="description" value={station.description} onChange={handleChange} multiline></TextField>
            <MultipleSelect addTags={addTags} />
            <UploadImg addStationImg={addStationImg} />
            <Button variant="outlined" color="secondary" type="submit">
              Create Station
          </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="secondary" autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






