import { stationService } from "../../services/stationService";


export function loadStations() { 
    return async (dispatch) => {
        try {
            const stations = await stationService.query()
            dispatch({ type: 'SET_STATIONS', stations })
        } catch (err) {
            console.log('err stationAction LOAD STATIONS', err);
        }
    }
}

export function loadStation(stationId) {
    return async (dispatch) => {
        try {
            const station = await stationService.getStationById(stationId)
            dispatch({ type: 'SET_STATION', station })
        } catch (err) {
            console.log('err stationAction LOAD STATION', err);
        }
    }
}

export function saveStation(station) {
    return async (dispatch) => {
        try {
            const savedStation = await stationService.save(station)
            dispatch({ type: (station._id) ? 'UPDATE_STATION' : 'ADD_STATION', station: savedStation })
        } catch (err) {
            console.log('err stationAction SAVE STATION', err);
        }
    }
}

export function cleanStation() {
    return (dispatch) => {
        try {
            dispatch({ type: 'CLEAN_STATION' })
        } catch (err) {
            console.log('err stationAction CLEAN STATION', err);
        }
    }
}


