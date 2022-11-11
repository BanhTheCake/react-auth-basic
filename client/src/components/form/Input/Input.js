import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import './Input.scss';

const Input = ({ control, errors, name, label, clearErrors, type = 'text' }) => {
    const {
        field: { onChange, value },
    } = useController({ name, control, defaultValue: ''});

    const handleChange = (e) => {
        onChange(e.target.value)
        clearErrors(name)
    }

    return (
        <div className="form-item">
            <label htmlFor="">{label}</label>
            <input type={type} value={value} onChange={handleChange} />
            { errors && errors[name] && <p className='form-err'>{errors[name].message}</p> }
        </div>
    );
};

export default Input;
