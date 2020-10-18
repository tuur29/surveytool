import { DefaultTheme } from "styled-components";

// prettier-ignore
const palettes = {
    // generated by https://material.io/design/color/the-color-system.html#color-theme-creation
    primary: ["#fdebee", "#fbcdd1", "#e99a9a", "#dd7473", "#e55751", "#e94839", "#db3f37", "#c93631", "#bc302b", "#ac2720"],
    secondary: ["#fefbe8", "#fcf5c5", "#faeea0", "#f8e87c", "#f6e362", "#f4dd4b", "#f2cd47", "#eeb640", "#e9a039", "#e17a2d"],
    // 8 stops between 000 and fff at percentages: 0%, 3%, 6%, 9%, 15%, 21%, 36%, 57%, 93%, 100% (and 100% - x) (https://www.joshuamiron.com/percent-to-hex-converter)
    neutralLight: ["#ffffff", "#f7f7f7", "#f0f0f0", "#e8e8e8", "#d9d9d9", "#c9c9c9", "#a3a3a3", "#6e6e6e", "#121212", "#000000"],
    neutralDark: ["#000000", "#080808", "#0f0f0f", "#171717", "#262626", "#363636", "#5c5c5c", "#919191", "#ededed", "#ffffff"],
};

const colors = {
    // general colours
    primary: palettes.primary[8],
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
    controlBackHover: palettes.neutralLight[2],
    controlHighlight: palettes.primary[8],
    controlHighlightActive: palettes.primary[6],
    controlBorder: palettes.neutralLight[6],
    controlBorderHover: palettes.neutralLight[8],
    controlBorderActive: palettes.neutralLight[7],
    controlPlaceholder: palettes.neutralLight[6],
    controlTick: palettes.neutralLight[6],
    controlSliderBack: palettes.neutralLight[6],
    controlButton: palettes.primary[8],
    controlOnButton: palettes.neutralLight[0],
    controlButtonDisabled: palettes.neutralLight[4],
    controlOnButtonDisabled: palettes.neutralLight[8],
    // messages
    messageInfo: "#BBDEFB",
    messageInfoBorder: "#2196F3",
    onMessageInfo: "#1976D2",
    messageError: "#FFCDD2",
    messageErrorBorder: "#F44336",
    onMessageError: "#D32F2F",
    messageNeutral: palettes.neutralLight[3],
    messageNeutralBorder: palettes.neutralLight[6],
    onMessageNeutral: palettes.neutralLight[8],
    // other colours
    shadow: palettes.neutralLight[7],
    spinner: palettes.primary[9],
    icon: palettes.neutralLight[6],
    iconHover: palettes.neutralLight[7],
    separator: palettes.neutralLight[4],
};

const sizes = {
    // general
    radius: "4px",
    title: "32px",
    subtitle: "18px",
    footer: "14px",
    // inputs
    controlBorder: "2px",
    controlCheckOffset: "2px",
    controlRadioOffset: "3px",
    controlError: "14px",
    controlSliderRailHeight: "6px",
    controlSliderTrackHeight: "12px",
    controlSliderHandleSize: "24px",
    buttonTextSize: "16px",
};

const zIndex = {
    checkmark: 1,
    tooltip: 1,
    selectValue: 1,
    sliderTrack: 1,
    sliderHandle: 2,
    messages: 3,
    debug: 4,
};

const elevation = {
    question: 1,
    button: 2,
    dropdown: 2,
    tooltip: 3,
    message: 3,
};

// ----------------------------------------------------------------------
// Typing
// ----------------------------------------------------------------------

type FontFamiliesType = "text" | "title";
type SizeType = keyof typeof sizes;
export type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl";
export type ColorType = keyof typeof colors;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: { [color in ColorType]: string };
        fonts: { [font in FontFamiliesType]: string };
        breakpoints: { [bp in BreakpointType]: string };
        sizes: { [size in SizeType]: string };
        zIndex: { [index in keyof typeof zIndex]: number };
        elevation: { [elevation in keyof typeof elevation]: number };
        space: number[];
    }
}

// ----------------------------------------------------------------------
// Default theme
// ----------------------------------------------------------------------

const lightTheme: DefaultTheme = {
    colors,
    sizes,
    zIndex,
    elevation,
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

const darkTheme: DefaultTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        // general colours
        primary: palettes.primary[9],
        back: palettes.neutralDark[2],
        surface: palettes.neutralDark[3],
        error: palettes.secondary[9],
        // text on general colours
        onPrimary: palettes.neutralDark[8],
        onBack: palettes.neutralDark[7],
        onSurface: palettes.neutralDark[8],
        onError: palettes.neutralDark[8],
        // input controls
        controlBack: palettes.neutralDark[1],
        controlBackHover: palettes.neutralDark[3],
        controlBorder: palettes.neutralDark[4],
        controlBorderHover: palettes.neutralDark[6],
        controlBorderActive: palettes.neutralDark[5],
        controlPlaceholder: palettes.neutralDark[6],
        controlTick: palettes.neutralDark[7],
        controlSliderBack: palettes.neutralDark[5],
        controlButton: palettes.primary[8],
        controlOnButton: palettes.neutralDark[8],
        controlButtonDisabled: palettes.neutralDark[5],
        controlOnButtonDisabled: palettes.neutralDark[8],
        // messages
        messageInfo: palettes.neutralDark[3],
        messageInfoBorder: "#1976D2",
        onMessageInfo: "#2196F3",
        messageError: palettes.neutralDark[3],
        messageErrorBorder: "#D32F2F",
        onMessageError: "#F44336",
        messageNeutral: palettes.neutralDark[3],
        messageNeutralBorder: palettes.neutralDark[5],
        onMessageNeutral: palettes.neutralDark[7],
        // other colours
        shadow: palettes.neutralDark[0],
        icon: palettes.neutralDark[8],
        iconHover: palettes.neutralDark[7],
        separator: palettes.neutralDark[5],
    },
};

export const defaultThemes = {
    lightTheme,
    darkTheme,
};

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------

// https://gist.github.com/serglo/f9f0be9a66fd6755a0bda85f9c64e85f
const elevations = [
    `0 1px 1px 0 #00000035, 0 2px 1px -1px #0000001e, 0 1px 3px 0 #00000033`,
    `0 2px 2px 0 #00000035, 0 3px 1px -2px #0000001e, 0 1px 5px 0 #00000033`,
    `0 3px 4px 0 #00000035, 0 3px 3px -2px #0000001e, 0 1px 8px 0 #00000033`,
    `0 4px 5px 0 #00000035, 0 1px 10px 0 #0000001e, 0 2px 4px -1px #00000033`,
    `0 6px 10px 0 #00000035, 0 1px 18px 0 #0000001e, 0 3px 5px -1px #00000033`,
    `0 8px 10px 1px #00000035, 0 3px 14px 2px #0000001e, 0 5px 5px -3px #00000033`,
    `0 9px 12px 1px #00000035, 0 3px 16px 2px #0000001e, 0 5px 6px -3px #00000033`,
    `0 12px 17px 2px #00000035, 0 5px 22px 4px #0000001e, 0 7px 8px -4px #00000033`,
    `0 16px 24px 2px #00000035, 0 6px 30px 5px #0000001e, 0 8px 10px -5px #00000033`,
    `0 24px 38px 3px #00000035, 0 9px 46px 8px #0000001e, 0 11px 15px -7px #00000033`,
];
export const getElevation = (level: number) => ({ theme }: { theme: DefaultTheme }): string =>
    (elevations[level] || "").replace(/#000000/g, theme.colors.shadow);
