import { useState, useEffect } from "react";

/** Returns true after the first render */
export const useAfterFirstRender = (): boolean => {
    const [value, setValue] = useState(false);
    useEffect(() => {
        setValue(true);
    }, []);
    return value;
};
