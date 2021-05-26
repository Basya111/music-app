const initialState = {
  currStation: null,
  stations: [],
}

export function stationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATIONS':
      return { ...state, stations: action.stations }
    case 'SET_STATION':
      return { ...state, currStation: { ...action.station } }
    case 'UPDATE_STATION':
      return { ...state, currStation: action.station }
    case 'CLEAN_STATION':
      return { ...state, currStation: null }
    case 'ADD_STATION':
      return { ...state, stations: [...state.stations, action.station], currStation: { ...action.station } }
    case 'SAVE_STATION':
      return {
        ...state, stations: state.stations.map(station => {
          if (station._id === action.station._id) return action.station
          else return station
        }),
        currStation: { ...action.station }
      }
    default:
      return state
  }
}