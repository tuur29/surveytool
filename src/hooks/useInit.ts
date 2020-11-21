import { useEffect } from "react";
import { ConfigType } from "../types/ConfigTypes";
import { isDev, resetFormDispatcher } from "../utils/utils";
import { useStoreDispatch } from "../redux/store";
import { messageTypes } from "../types/Messages";
import { mockConfig } from "../utils/mockConfig";
import { initConfig } from "../redux/actions/configActions";
import { addMessages } from "../redux/actions/messagesActions";
import { useLabels } from "./useLabel";
import useRestartTimer from "./useRestartTimer";

/**
 * Contains logic to initialize the app, should be called in root component
 */
const useInit = (): void => {
    const dispatch = useStoreDispatch();
    const [title, description] = useLabels(["messageErrorTitle", "messageInitError"]);

    // ----------------------------------------------------------------------
    // Init / update configuration
    // ----------------------------------------------------------------------
    useEffect(() => {
        // allow changing config after app init
        window.setSurveyConfig = (config: Partial<ConfigType>) => {
            if (config?.questions && config.questions.length > 0) {
                dispatch(initConfig(config as ConfigType));
            } else {
                console.error("Supplied data is not a valid config", config);

                dispatch(
                    addMessages([{ type: messageTypes.error, title: title || "", description: description || "" }]),
                );
            }
        };

        // init with already defined config or mockdata on dev mode
        if (window.surveyConfig || isDev(true)) {
            window.setSurveyConfig(window.surveyConfig || mockConfig);
        }

        /*
         * Add mockconfig to window so we can easily access it later for testing, examples:
         * window.setSurveyConfig({ ...window.mockConfig, theme: { darkMode: true, values: { colors: { controlHighlight: "#ff00ff" } } } });
         * window.setSurveyConfig({questions: [...window.mockConfig.questions.slice(2,4)]});
         * window.setSurveyConfig({ ...window.mockConfig, labels: { questionsTitle: "Hi!" } });
         */
        if (isDev(true)) {
            window.mockConfig = mockConfig;
        }
    }, [title, description, dispatch]);

    // ----------------------------------------------------------------------
    // Init restart timer
    // ----------------------------------------------------------------------
    const restartTime = useRestartTimer();
    useEffect(() => {
        if (restartTime !== null && restartTime <= 0) {
            resetFormDispatcher(dispatch);
        }
    }, [restartTime, dispatch]);
};

export default useInit;
