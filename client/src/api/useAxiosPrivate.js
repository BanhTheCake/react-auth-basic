import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { axiosPrivate } from './axios';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
    const auth = useSelector((state) => state.auth);
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers[
                        'Authorization'
                    ] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (err) => Promise.reject(err)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (res) => res,
            async (err) => {
                const previousReq = err.config;
                if (
                    err?.response.status === 401 &&
                    err?.response.data.message === 'jwt expired' &&
                    !previousReq?.sent
                ) {
                    try {
                        previousReq.sent = true;
                        const accessToken = await refreshToken();
                        previousReq.headers = { ...previousReq.headers };
                        previousReq.headers[
                            'Authorization'
                        ] = `Bearer ${accessToken}`;
                        return axiosPrivate(previousReq);
                    } catch (error) {
                        return Promise.reject(err);
                    }
                } else {
                    return Promise.reject(err);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [auth.accessToken, refreshToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;
