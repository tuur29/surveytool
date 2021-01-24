import { useEffect, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { resetFormDispatcher } from "../utils/utils";

const calcCountdown = (timestamp: number): number => Math.round((timestamp - Date.now()) / 1000);

/**
 * Returns the number of seconds before the survey will restart
 */
export const useRestartTimer = (): number | null => {
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

/**
 * Resets the answer state when the timer reaches 0
 */
export const useInitTimer = (): void => {
    const dispatch = useStoreDispatch();
    const restartTime = useRestartTimer();
    useEffect(() => {
        if (restartTime !== null && restartTime <= 0) {
            resetFormDispatcher(dispatch);
        }
    }, [restartTime, dispatch]);
};
