import { useEffect, useState } from "react";

function useLocalStorageState(key, initialState) {
    // Recupera estado inicial de localStorage si existe
    const [state, setState] = useState(() => {
        const item = localStorage.getItem(key);
        if (!item) return initialState;
        return JSON.parse(item);
    });

    // Cuando cambie el estado local, se sincroniza con localStorage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
}

export default useLocalStorageState;
