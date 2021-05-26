import { useEffect } from "react";
import { loadStations, saveStation } from "../store/actions/stationAction.js"
import { StationList } from "../cmps/station/StationList";
import { useDispatch, useSelector } from 'react-redux'
import { StationAdd } from "../cmps/station/StationAdd.jsx";
import { saveUser } from "../store/actions/userAction"


export const StationsPage = ({history}) => {

    const { stations } = useSelector(state => state.stationModule)
    const { currStation } = useSelector(state => state.stationModule)
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const addStation = (newStation) => {
        dispatch(saveStation(newStation))
        console.log('station',currStation);
        // if(currStation) {
            history.push(`station/${currStation._id}`)
            if(loggedInUser) onSaveUser(currStation)
        // }
    }

    const onSaveUser = (station) => {
        loggedInUser.stations = (loggedInUser.stations)? [...loggedInUser.stations, station] : [station]
        dispatch(saveUser(loggedInUser))
        console.log('user', loggedInUser);
    }

    return(
        <div className="stations-page">
            <StationAdd addStation={addStation} loggedInUser={loggedInUser} onSaveUser={onSaveUser}/>
            {stations && <StationList stations={stations}/>}
        </div>

    )
}