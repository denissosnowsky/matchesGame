import { useDispatch } from 'react-redux';
import { isChosenAC } from '../../redux/gameReducer';
import s from './Choice.module.css';


const Choice = () => {

    
    const dispatch = useDispatch();

    return(
        <div className={s.wrapper}>
            <div className={s.block}>
                <div className={s.header}>Кто начинает ?</div>
                <div className={s.me} onClick={()=>dispatch(isChosenAC(true, true))}>Я</div>
                <div className={s.comp} onClick={()=>dispatch(isChosenAC(true, false))}>Компьютер</div>
            </div>
        </div>
    );
};

export default Choice;