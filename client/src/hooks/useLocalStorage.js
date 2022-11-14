import { useEffect, useState } from "react"

const getLocalStorage = (key, initValue) => {
    // SSR next.js
    if (typeof window === 'undefined' ) return initValue

    // Check local storage
    const value = JSON.parse(localStorage.getItem(key))
    if (value) return value

    // Check init value
    if (typeof initValue === 'function') {
        return initValue()
    }
    return initValue

}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalStorage(key, initValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    const reset = () => {
        setValue(initValue)
    }

    return [value, setValue, reset]
}

export default useLocalStorage