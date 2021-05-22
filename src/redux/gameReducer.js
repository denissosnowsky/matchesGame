import gamePlay from "../scripts/gamePlay";
import { setErrorAC } from "./initializeReducer";

const SET_CHOSEN = 'SET_CHOSEN';
const SET_MATHCES = 'SET_MATHCES';
const MAKE_STEP = 'MAKE_STEP';
const SET_WINNER = 'SET_WINNER';
const RESET_GAME = 'RESET_GAME';
const COMP_FIRST = 'COMP_FIRST';
const SET_USER_FIRST = 'SET_USER_FIRST';


const initialState = {
    userAccount: 0,
    computerAccount: 0,
    matches: 0,
    isChosen: false,
    isUserFirst: true,
    winner: null
};

const gameReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CHOSEN:
            return {
                ...state,
                isChosen: action.isChosen,
                isUserFirst: action.isUserFirst
            }
        case SET_MATHCES:
            return{
                ...state,
                matches: action.matches
            }
        case MAKE_STEP:
            return{
                ...state,
                userAccount: action.userAccount,
                computerAccount: action.computerAccount,
                matches: action.matches
            }
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            }
        case RESET_GAME:
            return {
                ...state,
                userAccount: 0,
                computerAccount: 0,
                matches: 0,
                isChosen: false,
                isUserFirst: true,
                winner: null
            }
        case COMP_FIRST:{
            let step = Math.floor(Math.random() * action.maxTake)+1; //there are no winning step at the beginnig, so computer makes random choice
            return{
                ...state,
                computerAccount: +step,
                matches: state.matches - step 
            };
        }
        case SET_USER_FIRST:
            return{
                ...state,
                isUserFirst: true
            }
        default: 
            return state;
    }
};

export const compFirstAC = (maxTake) => ({
    type: COMP_FIRST, maxTake
});

export const setUserFirst = () => ({
    type: SET_USER_FIRST
});


export const resetGameAC = () => ({
    type: RESET_GAME
});

export const setWinnerAC = (winner) => ({
    type: SET_WINNER, winner
});

export const makeStepAC = (computerAccount, userAccount, matches) => ({
    type: MAKE_STEP, computerAccount, userAccount, matches
});

export const setMatchesAC = (matches) => ({
    type: SET_MATHCES, matches
});

export const isChosenAC = (isChosen, isUserFirst) => ({
   type: SET_CHOSEN, isChosen, isUserFirst
});

export const makeStepThunk = (number, computerAccount, userAccount, matches, computerSteps, m) => (dispatch) => {

    let result = gamePlay(number, computerAccount, userAccount, matches, computerSteps, m);

    if(!result.failed){
        if(result.matches===0){
            dispatch(makeStepAC(result.computerAccount, result.userAccount, result.matches));
            dispatch(setWinnerAC(result.winner));
            setTimeout(()=>{
                dispatch(setWinnerAC(null));
            }, 3000);
        } else{
            dispatch(makeStepAC(result.computerAccount, result.userAccount, result.matches));
        }
    } else {
        dispatch(setErrorAC(result.msg));
        setTimeout(()=>{
            dispatch(setErrorAC(null));
        },2000);
    }

};


export default gameReducer;