import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import { useStoreSelector } from "../redux/store";
import { getInitializedSelector } from "../utils/utils";
import { defaultThemes } from "../utils/theme";
import QuestionList from "./QuestionList";
import ResultList from "./ResultList";
import MessagesList from "./MessagesList";
import DebugPanel from "./DebugPanel";
import Footer from "./Footer";

const App = (): JSX.Element | null => {
    const initialized = useStoreSelector(getInitializedSelector);
    const theme = useStoreSelector((state) => state.config.theme);
    const overriddenTheme = merge(theme?.darkMode ? defaultThemes.darkTheme : defaultThemes.lightTheme, theme?.values);

    if (!initialized) return null;
    return (
        <ThemeProvider theme={overriddenTheme}>
            <DebugPanel />
            <MessagesList />
            <QuestionList />
            <ResultList />
            <Footer />
        </ThemeProvider>
    );
};

export default App;
