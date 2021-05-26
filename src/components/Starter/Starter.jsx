import s from './Starter.module.css';
import { Formik, Form } from 'formik';
import TextInput from '../TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux'
import { initializeThunk, setErrorAC } from '../../redux/initializeReducer';
import * as Yup from 'yup';


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
                    validationSchema={Yup.object({
                        n: Yup.string()
                            .matches(/^\d*[13579]$/, "Введите нечетное число")
                            .min(1,'Числа должны быть больше нуля')
                            .required('Введите все числа'),
                        m: Yup.number()
                            .typeError('Введите числа')
                            .lessThan(
                                Yup.ref("n"),
                                "Введите правильные числа"
                            )
                            .min(1,'Числа должны быть больше нуля')
                            .required('Введите все числа'),
                    })}
                    onSubmit={(values) => {
                        dispatch(initializeThunk(+values.n, +values.m));
                    }}
                >
                    <Form>
                        <TextInput
                            label="Введите нечетное число всех спичек:"
                            name="n"
                            type="text"
                            placeholder="Введите здесь..."
                            inputClass={s.input}
                            labelClass={s.label}
                            setErrorAC={setErrorAC}
                        />
                        <TextInput
                            label="Введите максимум спичек взять за раз:"
                            name="m"
                            type="text"
                            placeholder="Введите здесь..."
                            inputClass={s.input}
                            labelClass={s.label}
                            setErrorAC={setErrorAC}
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