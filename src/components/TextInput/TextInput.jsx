import {useField } from 'formik';

const TextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label className={props.labelClass} htmlFor={props.id || props.name}>{label}</label>
            <input className={props.inputClass} {...field} {...props} />
        </>
    );
};

export default TextInput;