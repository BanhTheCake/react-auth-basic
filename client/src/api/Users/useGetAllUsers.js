import { URL_USERS } from "../../utils/url.variables";
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from "../useAxiosPrivate";

const useGetAllUsers = (config) => {

    const axiosPrivate = useAxiosPrivate()

    const handleGetAllUsers = ({ signal }) => {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axiosPrivate({
                    method: 'get',
                    url: URL_USERS,
                    // To Cancel request
                    signal
                })
                const resData  = res?.data;
                if (resData?.errCode !== 0) {
                    return reject(resData)
                }
                resolve(resData)
            } catch (error) {
                if (!error?.response) {
                    return reject({
                        message: 'Server not response !'
                    })
                }
                let errMsg = error.response?.data?.message
                if (typeof(errMsg) === 'object') {
                    errMsg = Object.values(error.response?.data?.message).join(' ')
                }
                reject({ message: errMsg })
            }
        })
    }

    const objectQuery = useQuery(['Get All Employees'], handleGetAllUsers, {...config})
    return objectQuery
};

export default useGetAllUsers;
