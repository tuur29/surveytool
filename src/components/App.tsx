import React from "react";
import { isProduction } from "../utils/utils";
import QuestionList from "./QuestionList";
import { GlobalDebugStyle } from "./styles/theme";

const App = (): JSX.Element => {
    return (
        <>
            {!isProduction() && <GlobalDebugStyle />}
            <QuestionList />
        </>
    );
};

export default App;
