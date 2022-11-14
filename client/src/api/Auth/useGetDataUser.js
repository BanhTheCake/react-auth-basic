import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { URL_AUTH_USER } from '../../utils/url.variables';
import useAxiosPrivate from '../useAxiosPrivate';

const useGetDataUser = (config) => {
    const axiosPrivate = useAxiosPrivate();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const handleGetDataUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axiosPrivate({
                    method: 'get',
                    url: URL_AUTH_USER,
                });
                const resData = res?.data;
                if (resData?.errCode !== 0) {
                    return reject(resData);
                }
                resolve(resData);
            } catch (error) {
                if (!error?.response) {
                    const err = new Error('Server not response !');
                    return reject(err);
                }
                reject(error?.response?.data);
            }
        });
    };
    const objectQuery = useQuery(['Get Data User'], handleGetDataUser, {
        enabled: !!accessToken,
        // Call one time
        staleTime: Infinity,
        cacheTime: Infinity,
        select: (res) => res?.data,
        ...config,
    });
    
    return objectQuery
};

export default useGetDataUser;
