import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from "redux-thunk";
import gameReducer from './gameReducer';
import initializeReducer from './initializeReducer';


let reducers = combineReducers({
    initalization: initializeReducer,
    game: gameReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;

