import s from './Starter.module.css';
import { Formik, Form } from 'formik';
import TextInput from '../TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux'
import { initializeThunk, setErrorAC } from '../../redux/initializeReducer';


const Starter = () => {

    const error = useSelector(state => state.initalization.error);
    const dispatch = useDispatch();

    return (
        <div className={s.wrapper}>
            <div className={s.formWrapper}>
                <Formik
                    initialValues={{
                        n: '',
                        m: ''
                    }}
                    onSubmit={(values) => {
                        if(+values.n.length === 0 || +values.m.length === 0){
                            dispatch(setErrorAC('Введите все числа'));
                            setTimeout(()=>{
                                dispatch(setErrorAC(null));
                            },2000);
                        }else if(!/(?=^\d+$)/.test(+values.m) || !/(?=^\d+$)/.test(+values.n)){
                            dispatch(setErrorAC('Введите числа'));
                            setTimeout(()=>{
                                dispatch(setErrorAC(null));
                            },2000);
                        }else if(+values.m >= +values.n){
                            dispatch(setErrorAC('Число всех спичек должно быть больше'));
                            setTimeout(()=>{
                                dispatch(setErrorAC(null));
                            },2000);
                        }else if(+values.n % 2 === 0){
                            dispatch(setErrorAC('Число всех спичек должно быть нечетное'));
                            setTimeout(()=>{
                                dispatch(setErrorAC(null));
                            },2000);
                        }else if(+values.n <= 0 || +values.m <= 0){
                            dispatch(setErrorAC('Числа должны быть больше нуля'));
                            setTimeout(()=>{
                                dispatch(setErrorAC(null));
                            },2000);
                        }else{
                            dispatch(initializeThunk(+values.n, +values.m));
                        }
                    }}
                >
                    <Form>
                        <TextInput
                            label="Введите нечетное число всех спичек:"
                            placeholder="Введите здесь..."
                            name="n"
                            type="text"
                            inputClass={s.input}
                            labelClass={s.label}
                        />
                        <TextInput
                            label="Введите максимум спичек взять за раз:"
                            name="m"
                            type="text"
                            placeholder="Введите здесь..."
                            inputClass={s.input}
                            labelClass={s.label}
                        />
                        <button type="submit" className={s.subBtn}>Начать играть!</button>
                    </Form>
                </Formik>
            </div>
            {error ? <div className={s.errorBlock}>{error}</div> : null}
        </div>
    )
};

export default Starter;