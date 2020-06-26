import React from "react";
import { isProduction } from "../utils/utils";
import { GlobalDebugStyle } from "../utils/theme";
import QuestionList from "./QuestionList";

const App = (): JSX.Element => {
    return (
        <>
            {!isProduction() && <GlobalDebugStyle />}
            <QuestionList />
        </>
    );
};

export default App;
