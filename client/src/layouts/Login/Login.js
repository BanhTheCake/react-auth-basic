import React, { useState } from 'react';
import Input from '../../components/form/Input/Input';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validateSchema';
import useLogin from '../../api/Auth/useLogin';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../app/authSlice';

const Login = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        clearErrors,
    } = useForm({
        resolver: yupResolver(loginSchema),
        reValidateMode: 'onSubmit', // Submit => check error (default is onChange => change => check error)
    });

    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch()

    const onSuccess = (resData, variables) => {
        const data = resData?.data
        dispatch(setAuth({
            username: variables.username,
            accessToken: data.accessToken,
            roles: data.roles
        }))
    }

    const onError = (err) => {
        setErrMsg(err?.message);
    };

    const { mutate } = useLogin({ onError, onSuccess });

    const onSubmit = (data) => {
        setErrMsg('');
        mutate(data);
    };

    return (
        <section className="login">
            <div className="login-wrapper">
                {errMsg && <p className="login-err">{errMsg}</p>}
                <h3>Login</h3>
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
                    <button>Login</button>
                </form>
                <p>Don't have account ?</p>
                <a href="">Register</a>
            </div>
        </section>
    );
};

export default Login;
