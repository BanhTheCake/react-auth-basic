import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useGetDataUser from '../../api/Auth/useGetDataUser';
import useRefreshToken from '../../api/useRefreshToken';
import { setAuth } from '../../app/authSlice';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const auth = useSelector((state) => state.auth);
    const refreshToken = useRefreshToken();

    const dispatch = useDispatch()

    const onSuccess = (resData) => {
        console.log(resData);
        dispatch(setAuth({username: resData?.username}))
    }

    // Get info user
    const { isFetching } = useGetDataUser({ onSuccess })

    // Get access token when reload
    useEffect(() => {
        const verifyUsers = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        !auth?.accessToken ? verifyUsers() : setIsLoading(false);
    }, []);

    return (isLoading || isFetching) ? <div>Loading ... </div> : <Outlet />;
};

export default PersistLogin;
