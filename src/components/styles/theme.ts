import { DefaultTheme } from "styled-components";

type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl";
type FontFamiliesType = "text" | "title";
type ColorType = "primary" | "back" | "fore" | "backSoft" | "foreSoft";

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
        back: "#fff",
        backSoft: "#bbb",
        fore: "#000",
        foreSoft: "#444",
        primary: "#f00",
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
    },
    space: [0, 4, 8, 16, 32, 64],
};

export default theme;
