import React, { useState } from 'react';
import Input from '../../components/form/Input/Input';
import './Register.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useRegister from '../../api/Auth/useRegister';
import { registerSchema } from '../../utils/validateSchema';

const Register = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        clearErrors
    } = useForm({
        resolver: yupResolver(registerSchema),
        reValidateMode: 'onSubmit', // Submit => check error (default is onChange => change => check error)
    });

    const [errMsg, setErrMsg] = useState('')

    const onSuccess = (data) => {
        console.log(data);
    }

    const onError = (err) => {
        setErrMsg(err?.message)
    }

    const { mutate } = useRegister({ onSuccess, onError })

    const onSubmit = (data) => {
        const { cfpassword, ...reqData } = data;
        mutate(reqData)
    };

    return (
        <section className="register">
            <div className="register-wrapper">
                { errMsg && <p className='register-err'>{errMsg}</p> }
                <h3>Register</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Input
                        control={control}
                        errors={errors}
                        name={'username'}
                        label={'Username'}
                        clearErrors={clearErrors}
                    />
                    <Input
                        control={control}
                        errors={errors}
                        name={'password'}
                        label={'Password'}
                        clearErrors={clearErrors}
                        type={'text'}
                    />
                    <Input
                        control={control}
                        errors={errors}
                        name={'cfpassword'}
                        label={'Confirm password'}
                        clearErrors={clearErrors}
                        type={'text'}
                    />
                    <button>Register</button>
                </form>
                <p>Already have account ?</p>
                <a href="">Login</a>
            </div>
        </section>
    );
};

export default Register;
