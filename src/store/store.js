import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'


import { stationReducer } from './reducers/stationReducer.js';
import { userReducer } from './reducers/userReducer.js';

const rootReducer = combineReducers({
    stationModule: stationReducer,
    userModule: userReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));