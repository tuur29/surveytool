import { DefaultTheme, createGlobalStyle } from "styled-components";

// prettier-ignore
const palettes = {
    // generated by https://material.io/design/color/the-color-system.html#color-theme-creation
    primary: ["#fdebee", "#fbcdd1", "#e99a9a", "#dd7473", "#e55751", "#e94839", "#db3f37", "#c93631", "#bc302b", "#ac2720"],
    secondary: ["#fefbe8", "#fcf5c5", "#faeea0", "#f8e87c", "#f6e362", "#f4dd4b", "#f2cd47", "#eeb640", "#e9a039", "#e17a2d"],
    // 8 stops between 000 and fff at percentages: 0%, 3%, 6%, 9%, 15%, 21%, 36%, 57%, 93%, 100% (an 100% - x) (https://www.joshuamiron.com/percent-to-hex-converter)
    neutralLight: ["#ffffff", "#f7f7f7", "#f0f0f0", "#e8e8e8", "#d9d9d9", "#c9c9c9", "#a3a3a3", "#6e6e6e", "#121212", "#000000"],
    neutralDark: ["#000000", "#080808", "#0f0f0f", "#171717", "#262626", "#363636", "#5c5c5c", "#919191", "#ededed", "#ffffff"],
};

 
const colors = {
    // general colours
    primary: palettes.primary[9],
    back: palettes.neutralLight[0],
    surface: palettes.neutralLight[1],
    error: palettes.secondary[9],
    // text on general colours
    onPrimary: palettes.neutralLight[0],
    onBack: palettes.neutralLight[7],
    onSurface: palettes.neutralLight[8],
    onError: palettes.neutralLight[1],
    // input controls
    controlBack: palettes.neutralLight[0],
    controlHover: palettes.neutralLight[2],
    controlHighlight: palettes.primary[8],
    controlBorder: palettes.neutralLight[6],
    controlBorderHover: palettes.neutralLight[8],
    controlBorderActive: palettes.neutralLight[7],
    // other colours
    shadow: palettes.neutralLight[7],
    spinner: palettes.primary[9],
    icon: palettes.neutralLight[6],
    iconHover: palettes.neutralLight[7],
};

const sizes = {
    radius: "4px",
    controlBorder: "2px",
    controlValueOffset: "3px",
    questionTitle: "18px",
};

// ----------------------------------------------------------------------
// Typing
// ----------------------------------------------------------------------

type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl";
type FontFamiliesType = "text" | "title";
type SizeType = keyof typeof sizes;
export type ColorType = keyof typeof colors;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: { [color in ColorType]: string };
        fonts: { [font in FontFamiliesType]: string };
        breakpoints: { [bp in BreakpointType]: string };
        sizes: {[size in SizeType]: string};
        space: number[];
        elevation: string[];
    }
}

// ----------------------------------------------------------------------
// Default theme
// ----------------------------------------------------------------------

// TODO: Override theme values in config
const theme: DefaultTheme = {
    colors,
    sizes,
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
    elevation: [
        // https://gist.github.com/serglo/f9f0be9a66fd6755a0bda85f9c64e85f
        `0 1px 1px 0 ${colors.shadow}35, 0 2px 1px -1px ${colors.shadow}1e, 0 1px 3px 0 ${colors.shadow}33`,
        `0 2px 2px 0 ${colors.shadow}35, 0 3px 1px -2px ${colors.shadow}1e, 0 1px 5px 0 ${colors.shadow}33`,
        `0 3px 4px 0 ${colors.shadow}35, 0 3px 3px -2px ${colors.shadow}1e, 0 1px 8px 0 ${colors.shadow}33`,
        `0 4px 5px 0 ${colors.shadow}35, 0 1px 10px 0 ${colors.shadow}1e, 0 2px 4px -1px ${colors.shadow}33`,
        `0 6px 10px 0 ${colors.shadow}35, 0 1px 18px 0 ${colors.shadow}1e, 0 3px 5px -1px ${colors.shadow}33`,
        `0 8px 10px 1px ${colors.shadow}35, 0 3px 14px 2px ${colors.shadow}1e, 0 5px 5px -3px ${colors.shadow}33`,
        `0 9px 12px 1px ${colors.shadow}35, 0 3px 16px 2px ${colors.shadow}1e, 0 5px 6px -3px ${colors.shadow}33`,
        `0 12px 17px 2px ${colors.shadow}35, 0 5px 22px 4px ${colors.shadow}1e, 0 7px 8px -4px ${colors.shadow}33`,
        `0 16px 24px 2px ${colors.shadow}35, 0 6px 30px 5px ${colors.shadow}1e, 0 8px 10px -5px ${colors.shadow}33`,
        `0 24px 38px 3px ${colors.shadow}35, 0 9px 46px 8px ${colors.shadow}1e, 0 11px 15px -7px ${colors.shadow}33`,
    ],
};

// Flip fore and background colours for darkmode
const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
    },
};

export const GlobalDebugStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.onBack};
    background-color: ${({ theme }) => theme.colors.back};
  }
`;

// TODO: darktheme should be turned off before building release
export default darkTheme || theme;
