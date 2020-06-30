import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import { useStoreSelector } from "../redux/store";
import { isProduction } from "../utils/utils";
import { GlobalDebugStyle, theme, darkTheme } from "../utils/theme";
import useInit from "../hooks/useInit";
import QuestionList from "./QuestionList";

const App = (): JSX.Element => {
    useInit();
    const themeConfig = useStoreSelector((state) => state.config.theme);
    const overriddenTheme = merge(themeConfig?.darkMode ? darkTheme : theme, themeConfig?.values);

    return (
        <ThemeProvider theme={overriddenTheme}>
            <>
                {!isProduction() && <GlobalDebugStyle />}
                <QuestionList />
            </>
        </ThemeProvider>
    );
};

export default App;
