import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./components/App";
import theme from "./components/styles/theme";
import store from "./redux/store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// Prevent rerenders from Providers
const MemoWrapper = React.memo(({ children }: { children: React.ReactNode }) => <>{children}</>);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <StoreProvider store={store}>
                <MemoWrapper>
                    <App />
                </MemoWrapper>
            </StoreProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("surveyTool"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
