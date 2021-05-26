import {useField } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const TextInput = ({ label, ...props }) => {
console.log('render');
    const [field, meta] = useField(props);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(meta.touched && meta.error){
            dispatch(props.setErrorAC(meta.error));
        } else {
            dispatch(props.setErrorAC(null));
        }
    }, [meta.error, meta.touched]);
        

    return (
        <>
            <label className={props.labelClass} htmlFor={props.id || props.name}>{label}</label>
            <input className={props.inputClass} {...field} {...props} />
        </>
    );
};

export default TextInput;