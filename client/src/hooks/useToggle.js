import useLocalStorage from "./useLocalStorage"

const useToggle = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, Boolean(initValue))

    const toggle = () => {
        setValue(prev => !prev)
    }

    return [value, toggle]
}

export default useToggle