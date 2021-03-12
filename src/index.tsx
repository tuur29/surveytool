import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import App from "./components/App";
import createNewStore, { StoreType } from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { ConfigType } from "./types/ConfigTypes";
import { initConfig } from "./redux/actions/configActions";
import { mockConfig } from "./utils/mockConfig";
import { isDev } from "./utils/utils";
import { resetAnswers } from "./redux/actions/answersActions";
import { AllAnswersType } from "./types/AnswerTypes";

// Prevent rerenders from Providers
const MemoWrapper = React.memo(({ children }: { children: React.ReactNode }) => <>{children}</>);

export class SurveyTool {
    private _store: StoreType;

    constructor(selector: string, config?: ConfigType) {
        this._store = createNewStore();
        if (config) this.updateConfig(config);

        ReactDOM.render(
            <React.StrictMode>
                <StoreProvider store={this._store}>
                    <MemoWrapper>
                        <App />
                    </MemoWrapper>
                </StoreProvider>
            </React.StrictMode>,
            document.querySelector(selector),
        );
    }

    /**
     * Update the active config
     * @returns boolean indicating a valid config
     */
    updateConfig(config: ConfigType): boolean {
        if (config.groups && config.groups.length > 0) {
            this._store.dispatch(initConfig(config));
        } else {
            console.error("Supplied data is not a valid config", config);
            return false;
        }
        return true;
    }

    resetAnswers(): void {
        this._store.dispatch(resetAnswers());
    }

    get answers(): AllAnswersType[] {
        return this._store.getState().answers.list;
    }

    get config(): ConfigType {
        return this._store.getState().config;
    }
}

// Make this class accessible on window
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
(window as any).SurveyTool = SurveyTool;

// Init the tool with mockconfig when developing or running demo
if (isDev(true)) {
    const tool = new SurveyTool("#surveyTool");
    tool.updateConfig(mockConfig as ConfigType);
    (window as any).tool = tool;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
