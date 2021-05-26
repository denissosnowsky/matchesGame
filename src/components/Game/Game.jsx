import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStepThunk, resetGameAC } from '../../redux/gameReducer';
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
    const error = useSelector(state => state.initalization.error)
    const dispatch = useDispatch();
    
    const [takenStep, setTakenStep] = useState('');

    const inputValidate = (e) => {
        if(isNaN(e.target.value)){
            setTakenStep(e.target.value);
        }else if(e.target.value.length === 0){
            setTakenStep('');
        } else {
            setTakenStep(+e.target.value);
        }
    };

    if(!isChosenFirstPlayer){
        return <Choice />
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
                        <input value={takenStep} onChange={inputValidate} className={s.inputHit} name='step' type='text' placeholder='Сколько спичек взять?'/>
                    </div>
                    <div className={s.btnWrp}>
                        <div className={s.btn} onClick={()=>dispatch(makeStepThunk(
                            takenStep,
                            computerAccount, 
                            userAccount, 
                            matches, 
                            computerSteps,
                            maxTake
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