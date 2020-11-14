import { useEffect, useRef, useState } from "react";
import { useStoreSelector } from "../redux/store";

const calcCountdown = (timestamp: number): number => Math.round((timestamp - Date.now()) / 1000);

/**
 * Returns the number of seconds before the survey will restart
 */
const useRestartTimer = (): number | null => {
    const restartTimestamp = useStoreSelector((state) => state.result.restartTimestamp);
    const [countdown, setCountdown] = useState(restartTimestamp ? calcCountdown(restartTimestamp) : null);
    const timerInterval = useRef<number>();

    useEffect(() => {
        if (!restartTimestamp) return;
        if (timerInterval.current) clearInterval(timerInterval.current);
        timerInterval.current = setInterval(() => {
            const newCountdown = calcCountdown(restartTimestamp!);
            if (newCountdown <= 0) {
                clearInterval(timerInterval.current);
            }
            setCountdown(newCountdown);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restartTimestamp]);

    return countdown;
};

export default useRestartTimer;
