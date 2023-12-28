import { useEffect, useReducer } from "react";

function useReducerWithLocalStorage(reducer, initialState, localStorageKey) {
    const [state, dispatch] = useReducer(reducer, null, () => {
        const localStorageItem = localStorage.getItem(localStorageKey);
        if (!localStorageItem) return initialState;
        return JSON.parse(localStorageItem);
    });

    // Synchronize with localStorage
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [state]);

    return [state, dispatch];
}

export default useReducerWithLocalStorage;
