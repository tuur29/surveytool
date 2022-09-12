import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { BreakpointType } from "../utils/theme";

export const useWindowWidth = (): number => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const listener = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, []);

    return windowWidth;
};

export const useBreakpoint = (breakpoint: BreakpointType, direction: "min" | "max", including?: boolean): boolean => {
    const windowWidth = useWindowWidth();
    const { breakpoints } = useTheme();
    const value = parseInt(breakpoints[breakpoint]);

    if (direction === "max") {
        return including ? windowWidth <= value : windowWidth < value;
    }
    if (direction === "min") {
        return including ? windowWidth >= value : windowWidth > value;
    }
    return false;
};
