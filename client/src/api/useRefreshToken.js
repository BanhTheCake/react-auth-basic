import { URL_REFRESH } from '../utils/url.variables';
import axios from './axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setAuth } from '../app/authSlice';

const useRefreshToken = (config) => {
    const dispatch = useDispatch();

    const handleRefreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'get',
                    url: URL_REFRESH,
                });
                const resData = res?.data;
                if (resData?.errCode !== 0) {
                    return reject(resData);
                }
                resolve(resData);
            } catch (error) {
                if (!error?.response) {
                    return reject({
                        message: 'Server not response !',
                    });
                }
                let errMsg = error.response?.data?.message;
                if (typeof errMsg === 'object') {
                    errMsg = Object.values(error.response?.data?.message).join(
                        ' '
                    );
                }
                reject({ message: errMsg });
            }
        });
    };
    const { refetch: refreshToken } = useQuery(
        ['Refresh Token'],
        handleRefreshToken,

        // Must has staleTime and cacheTime => when error react-query will get previous token => wrong
        { enabled: false, staleTime: 0, cacheTime: 0, ...config }
    );

    const handleRefresh = async () => {
        try {
            const res = await refreshToken();
            const accessToken = res?.data?.accessToken;
            if (accessToken) {
                dispatch(setAuth({ accessToken }));
                return accessToken;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    return handleRefresh;
};

export default useRefreshToken;
