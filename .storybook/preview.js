import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { initConfig } from "../src/redux/actions/configActions";
import { setResult } from "../src/redux/actions/resultActions";
import createNewStore from "../src/redux/store";
import { mockConfig } from "../src/utils/mockConfig";
import { defaultThemes, palettes } from "../src/utils/theme";
import { GlobalDebugStyle } from "../src/components/DebugPanel";

// ----------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "centered",
    viewMode: "story",
    previewTabs: {
        "storybook/docs/panel": { hidden: true }
    },
    options: {
        enableShortcuts: false,
        storySort: {
            order: [
                "Intro",
                "Config",
                ["General", "Colors", ["Palettes", "Light", "Dark"], "Labels", "Example"],
                "Questions",
                ["General", "Single Choice", "Multiple Choice", "Text", "Range"],
                "Results",
                ["General", "Label", "Button", "Graph", "IFrame"],
                "Components"
            ],
        },
    },
    controls: { expanded: true }
};


export const globalTypes = {
    theme: {
        name: "Theme",
        description: "Global theme for components",
        defaultValue: "lightTheme",
        toolbar: {
            icon: "circlehollow",
            // array of plain string values or MenuItem shape (see below)
            items: [
                {
                    value: "lightTheme",
                    title: "Light",
                    icon: "circlehollow",
                },
                {
                    value: "darkTheme",
                    title: "Dark",
                    icon: "circle",
                },
            ],
        },
    },
};

// ----------------------------------------------------------------------
// Setup components
// ----------------------------------------------------------------------

const store = createNewStore();
store.dispatch(initConfig(mockConfig));
store.dispatch(setResult(25));

export const decorators = [
    (Story, context) => (
        <StoreProvider store={store}>
            <ThemeProvider theme={defaultThemes[context.globals.theme]}>
                <GlobalDebugStyle />
                <Story />
            </ThemeProvider>
        </StoreProvider>
    ),
];
