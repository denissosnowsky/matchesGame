import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compFirstAC, makeStepThunk, resetGameAC, setUserFirst } from '../../redux/gameReducer';
import { resetInitializationAC } from '../../redux/initializeReducer';
import Choice from '../Choice/Choice';
import s from './Game.module.css';


const Game = () => {

    const userAccount = useSelector(state => state.game.userAccount);
    const computerAccount = useSelector(state => state.game.computerAccount);
    const matches = useSelector(state => state.game.matches);
    const maxTake = useSelector(state => state.initalization.maxTake);
    const isChosenFirstPlayer = useSelector(state => state.game.isChosen);
    const computerSteps = useSelector(state => state.initalization.computerSteps);
    const winner = useSelector(state => state.game.winner);
    const isUserFirst = useSelector(state => state.game.isUserFirst);
    const error = useSelector(state => state.initalization.error)
    const dispatch = useDispatch();
    
    const [takenStep, setTakenStep] = useState('');

    if(!isChosenFirstPlayer){
        return <Choice />
    }
    
    if(!isUserFirst){
        dispatch(setUserFirst());
        dispatch(compFirstAC(maxTake));
    }

    return(
        <div className={s.wrapper}>
            <div className={s.display}>
                <div className={s.board}>
                    <div className={s.me}>
                        <div className={s.account}>{userAccount}</div>
                        <div className={s.photo}>🦸‍♂️</div>
                        <div className={s.name}>Вы</div>
                    </div>
                    <div className={s.table}>
                        <div className={s.left}>{matches}</div>
                        <div className={s.name}>Осталось</div>
                    </div>
                    <div className={s.comp}>
                        <div className={s.account}>{computerAccount}</div>
                        <div className={s.photo}>🦹</div>
                        <div className={s.name}>Компьютер</div>
                    </div>
                </div>
                <div className={s.menu}>
                    <div className={s.btnWrp}>
                        <input value={takenStep} onChange={(e)=>setTakenStep(e.target.value)} className={s.inputHit} name='step' type='text' placeholder='Сколько спичек взять?'/>
                    </div>
                    <div className={s.btnWrp}>
                        <div className={s.btn} onClick={()=>dispatch(makeStepThunk(
                            +takenStep,
                            +computerAccount, 
                            +userAccount, 
                            +matches, 
                            computerSteps,
                            +maxTake
                        ))}>Сделать ход!</div>
                    </div>
                    <div className={s.btnWrp}>
                        <div className={s.btn} onClick={()=>{
                            dispatch(resetInitializationAC());
                            dispatch(resetGameAC());
                        }}>Заново</div>
                    </div>
                </div>
            </div>
            {winner ? <div className={s.winner}>{winner}</div> : null}
            {error ? <div className={s.errorBlock}>{error}</div> : null}
        </div>
    );
};

export default Game;