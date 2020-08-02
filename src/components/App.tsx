import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import useInit from "../hooks/useInit";
import { toggleBaseTheme } from "../redux/configReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { defaultThemes, GlobalDebugStyle } from "../utils/theme";
import { isDev, formatTimestamp } from "../utils/utils";
import useLabel from "../hooks/useLabel";
import Checkbox from "./common/Checkbox";
import QuestionList from "./QuestionList";
import ResultList from "./ResultList";
import { Label } from "./styles/Input";
import { Footer } from "./styles/Container";

const App = (): JSX.Element => {
    useInit();
    const dispatch = useStoreDispatch();

    // theme
    const theme = useStoreSelector((state) => state.config.theme);
    const showResult = useStoreSelector((state) => state.result.showResult);
    const overriddenTheme = merge(theme?.darkMode ? defaultThemes.darkTheme : defaultThemes.lightTheme, theme?.values);

    // footer
    const lastAnsweredTimestamp = useStoreSelector((state) => state.answers.lastUpdate);
    const showAnsweredTimetamp = useStoreSelector((state) => state.answers.loadedFromStorage);
    const dateLocaleId = useLabel("dateLocaleId");
    const footerLabel = useLabel("questionsFooter", {
        date: formatTimestamp(lastAnsweredTimestamp, dateLocaleId),
    });

    return (
        <ThemeProvider theme={overriddenTheme}>
            <>
                {isDev(true) && (
                    <>
                        <GlobalDebugStyle />
                        <Label
                            onClick={() => dispatch(toggleBaseTheme(!theme?.darkMode))}
                            style={{ position: "fixed", top: "20px", right: "20px" }}
                        >
                            <Checkbox checked={theme?.darkMode} />
                            Dark mode
                        </Label>
                    </>
                )}
                <QuestionList />
                {showResult && <ResultList />}

                {showAnsweredTimetamp && footerLabel && <Footer>{footerLabel}</Footer>}
            </>
        </ThemeProvider>
    );
};

export default App;
