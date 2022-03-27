import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import { useStoreSelector } from "../redux/store";
import { getInitializedSelector } from "../utils/utils";
import { defaultThemes } from "../utils/theme";
import QuestionGroupList from "./QuestionGroupList";
import ResultList from "./ResultList";
import MessagesList from "./MessagesList";
import DebugPanel from "./DebugPanel";
import Footer from "./Footer";

const BaseStyle = styled.div`
    font-family: ${({ theme }) => theme.fonts.text};
`;

const App = (): JSX.Element | null => {
    const initialized = useStoreSelector(getInitializedSelector);
    const theme = useStoreSelector((state) => state.config.theme);
    const overriddenTheme = merge(theme?.darkMode ? defaultThemes.darkTheme : defaultThemes.lightTheme, theme?.values);

    if (!initialized) return null;
    return (
        <ThemeProvider theme={overriddenTheme}>
            <BaseStyle>
                <DebugPanel />
                <MessagesList />
                <QuestionGroupList />
                <ResultList />
                <Footer />
            </BaseStyle>
        </ThemeProvider>
    );
};

export default App;
