import { useMutation } from "@tanstack/react-query";
import { URL_AUTH_REGISTER } from "../../utils/url.variables";
import axios from "../axios";

const useRegister = (config) => {
    const handleRegister = (data) => {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_AUTH_REGISTER,
                    data: data
                })
                const resData = res?.data
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

    const ObjectMutation = useMutation(handleRegister, { ...config })
    return ObjectMutation
}

export default useRegister