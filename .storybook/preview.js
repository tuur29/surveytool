import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { initConfig } from "../src/redux/configReducer";
import store from "../src/redux/store";
import { mockConfig } from "../src/utils/mock";
import { defaultThemes } from "../src/utils/theme";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
};

store.dispatch(initConfig(mockConfig));

export const decorators = [
    (Story) => (
        <StoreProvider store={store}>
            <ThemeProvider theme={defaultThemes.lightTheme}>
                <Story />
            </ThemeProvider>
        </StoreProvider>
    ),
];
