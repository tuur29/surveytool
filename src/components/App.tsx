import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import useInit from "../hooks/useInit";
import { toggleBaseTheme } from "../redux/configReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { defaultThemes, GlobalDebugStyle } from "../utils/theme";
import { isDev } from "../utils/utils";
import Checkbox from "./common/Checkbox";
import QuestionList from "./QuestionList";
import { Label } from "./styles/Input";

const App = (): JSX.Element => {
    useInit();
    const dispatch = useStoreDispatch();
    const theme = useStoreSelector((state) => state.config.theme);
    const overriddenTheme = merge(
        theme?.darkMode ? defaultThemes.darkTheme : defaultThemes.lightTheme,
        theme?.values,
    );

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
            </>
        </ThemeProvider>
    );
};

export default App;
