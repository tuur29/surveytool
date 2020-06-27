import React from "react";
import { isProduction } from "../utils/utils";
import { GlobalDebugStyle } from "../utils/theme";
import useInit from "../hooks/useInit";
import QuestionList from "./QuestionList";

const App = (): JSX.Element => {
    useInit();
    return (
        <>
            {!isProduction() && <GlobalDebugStyle />}
            <QuestionList />
        </>
    );
};

export default App;
