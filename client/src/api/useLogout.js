import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setAuth } from '../app/authSlice';
import { URL_AUTH_LOGOUT } from '../utils/url.variables';
import axios from './axios';

const useLogout = (config) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await axios({
                    method: 'get',
                    url: URL_AUTH_LOGOUT,
                });
                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };
    const { refetch } = useQuery(['log out'], handleLogout, {
        enabled: false,
        ...config,
    });
    const logout = async () => {
        await refetch();
        dispatch(setAuth({ username: null, accessToken: null }));
    };
    return logout;
};

export default useLogout;
