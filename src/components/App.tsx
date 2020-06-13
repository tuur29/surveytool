import React from "react";
import QuestionList from "./QuestionList";
import { GlobalStyle } from "./styles/theme";

const App = (): JSX.Element => {
    return (
        <>
            {/* TODO: add a way to disable this global style */}
            <GlobalStyle />
            <QuestionList />
        </>
    );
};

export default App;
