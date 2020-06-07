import { DefaultTheme } from "styled-components";

type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type FontFamiliesType = "text" | "title";
type ColorType = "primary" | "back" | "fore";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: { [color in ColorType]: string };
        fonts: { [font in FontFamiliesType]: string };
        breakpoints: { [bp in BreakpointType]: string };
        space: number[];
    }
}

const theme: DefaultTheme = {
    colors: {
        back: "white",
        fore: "black",
        primary: "red",
    },
    fonts: {
        title: "Lato, sans-serif",
        text: "Open Sans, Arial, sans-serif",
    },
    breakpoints: {
        xs: "0px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
    },
    space: [0, 4, 8, 16, 32, 64],
};

export default theme;
