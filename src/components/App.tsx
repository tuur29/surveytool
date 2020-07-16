import React from "react";
import { ThemeProvider } from "styled-components";
import { merge } from "lodash";
import useInit from "../hooks/useInit";
import { toggleBaseTheme } from "../redux/configReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { darkTheme, GlobalDebugStyle, theme } from "../utils/theme";
import { isDev } from "../utils/utils";
import Checkbox from "./common/Checkbox";
import QuestionList from "./QuestionList";
import { Label } from "./styles/Input";

const App = (): JSX.Element => {
    useInit();
    const dispatch = useStoreDispatch();
    const themeConfig = useStoreSelector((state) => state.config.theme);
    const overriddenTheme = merge(themeConfig?.darkMode ? darkTheme : theme, themeConfig?.values);

    return (
        <ThemeProvider theme={overriddenTheme}>
            <>
                {isDev(true) && (
                    <>
                        <GlobalDebugStyle />
                        <Label
                            onClick={() => dispatch(toggleBaseTheme(!themeConfig?.darkMode))}
                            style={{ position: "fixed", top: "20px", right: "20px" }}
                        >
                            <Checkbox checked={themeConfig?.darkMode} />
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
