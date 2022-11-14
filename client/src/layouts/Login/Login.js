import React, { useState } from 'react';
import Input from '../../components/form/Input/Input';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validateSchema';
import useLogin from '../../api/Auth/useLogin';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../app/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import useFormPersist from 'react-hook-form-persist';

const Login = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        clearErrors,
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(loginSchema),
        reValidateMode: 'onSubmit', // Submit => check error (default is onChange => change => check error)
    });

    useFormPersist('storageKey', {
        watch,
        setValue,
        storage: window.localStorage,
    });

    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const onSuccess = (resData, variables) => {
        const data = resData?.data;
        dispatch(
            setAuth({
                username: variables.username,
                accessToken: data.accessToken,
            })
        );
        navigate(from, { replace: true });
    };

    const onError = (err) => {
        setErrMsg(err?.message);
    };

    const { mutate } = useLogin({ onError, onSuccess });

    const onSubmit = (data) => {
        setErrMsg('');
        mutate(data);
    };

    const [checked, toggleCheck] = useToggle('Check', false);

    return (
        <section className="container">
            <div className="login">
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
                    <div className="check">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={toggleCheck}
                        />
                        <span>Trust this device</span>
                    </div>
                    <button>Login</button>
                </form>
                <p>Don't have account ?</p>
                <a href="">Register</a>
            </div>
        </section>
    );
};

export default Login;
