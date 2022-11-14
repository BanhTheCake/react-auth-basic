import axios from 'axios'

export default axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: 'include'
})

export const axiosPrivate = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: 'include'
})