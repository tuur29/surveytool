import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import { useStoreSelector } from "../redux/store";
import { defaultThemes } from "../utils/theme";
import { formatTimestamp } from "../utils/utils";
import useLabel from "../hooks/useLabel";
import { useInitTimer } from "../hooks/timerHooks";
import QuestionList from "./QuestionList";
import ResultList from "./ResultList";
import MessagesList from "./MessagesList";
import { Footer } from "./styles/Container";
import DebugPanel from "./DebugPanel";

const App = (): JSX.Element | null => {
    useInitTimer();

    // theme
    const initialized = useStoreSelector((state) => state.config.initialized);
    const theme = useStoreSelector((state) => state.config.theme);
    const showResult = useStoreSelector((state) => state.result.showResult);
    const overriddenTheme = merge(theme?.darkMode ? defaultThemes.darkTheme : defaultThemes.lightTheme, theme?.values);

    // footer
    const lastAnsweredTimestamp = useStoreSelector((state) => state.answers.lastUpdate);
    const showAnsweredTimetamp = useStoreSelector((state) => state.answers.loadedFromStorage);
    const dateLocaleId = useLabel("dateLocaleId");
    const footerLabel = useLabel("footerText", {
        date: formatTimestamp(lastAnsweredTimestamp, dateLocaleId),
    });

    if (!initialized) return null;

    return (
        <ThemeProvider theme={overriddenTheme}>
            <DebugPanel />
            <MessagesList />
            <QuestionList />
            {showResult && <ResultList />}
            {showAnsweredTimetamp && footerLabel && <Footer>{footerLabel}</Footer>}
        </ThemeProvider>
    );
};

export default App;
