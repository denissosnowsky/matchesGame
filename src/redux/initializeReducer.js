import initalizationScript from "../scripts/initialization";
import { setMatchesAC } from "./gameReducer";

const INITIALIZE_STEPS = 'INITIALIZE_STEPS';
const SET_ERROR = 'SET_ERROR';
const SET_INITIALIZED = 'SET_INITIALIZED';
const RESET_INITIALIZATION = 'RESET_INITIALIZATION';

const initialState = {
    computerSteps: [],
    allMatches: 0,
    maxTake: 0,
    error: null,
    isInitialized: false
};


const initializeReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALIZE_STEPS:
            return{
                ...state,
                allMatches: action.n,
                maxTake: action.m,
                computerSteps: action.array
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_INITIALIZED:
            return{
                ...state,
                isInitialized: action.isSet
            }
        case RESET_INITIALIZATION:
            return{
                ...state,
                computerSteps: [],
                allMatches: 0,
                maxTake: 0,
                error: null,
                isInitialized: false
            }
        default:
            return state;
    }
};

export const resetInitializationAC = () => ({
    type: RESET_INITIALIZATION
});

export const setInitialized = (isSet) => ({
    type: SET_INITIALIZED, isSet
});

export const setErrorAC = (error) => ({
    type: SET_ERROR, error
});

export const initializeAC = (n, m, array) => ({
    type: INITIALIZE_STEPS, n, m, array
});

export const initializeThunk = (n, m) => (dispatch) => {
    let computerSteps = initalizationScript(n, m);
    dispatch(initializeAC(n, m, computerSteps));
    dispatch(setInitialized(true));
    dispatch(setMatchesAC(n));
}; 


export default initializeReducer;
