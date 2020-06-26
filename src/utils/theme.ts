import { DefaultTheme, createGlobalStyle } from "styled-components";

type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl";
type FontFamiliesType = "text" | "title";
export type ColorType = "primary" | "back" | "fore" | "backSoft" | "foreSoft" | "backShadow" | "foreShadow";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: { [color in ColorType]: string };
        fonts: { [font in FontFamiliesType]: string };
        breakpoints: { [bp in BreakpointType]: string };
        space: number[];
        iconSize: number,
    }
}

// TODO: allow configuring theme dynamically
const theme: DefaultTheme = {
    colors: {
        back: "#fff",
        backSoft: "#ddd",
        backShadow: "#999",
        fore: "#000",
        foreSoft: "#222",
        foreShadow: "#666",
        primary: "#AC2820",
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
    iconSize: 16,
};

// Flip fore amd background colours for darkmode
const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        back: theme.colors.fore,
        backSoft: theme.colors.foreSoft,
        backShadow: theme.colors.foreShadow,
        fore: theme.colors.back,
        foreSoft: theme.colors.backSoft,
        foreShadow: "transparent",
    },
};

export const GlobalDebugStyle = createGlobalStyle`
  body {
    color: ${({theme}) => theme.colors.fore};
    background-color: ${({theme}) => theme.colors.back};
  }
`

// TODO: darktheme should be turned off before building release
export default darkTheme || theme;
