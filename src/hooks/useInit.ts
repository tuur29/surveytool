import { useEffect } from "react";
import { ConfigType } from "../types/ConfigTypes";
import { mockConfig } from "../utils/mockConfig";
import { isDev } from "../utils/utils";
import { useStoreDispatch } from "../redux/store";
import { initConfig } from "../redux/configReducer";
import { addMessages } from "../redux/messagesReducer";
import { messageTypes } from "../types/Messages";
import { useLabels } from "./useLabel";

/**
 * Contains logic to initialize the app, should be called in root component
 */
const useInit = (): void => {
    const dispatch = useStoreDispatch();
    const [title, description] = useLabels(["messageErrorTitle", "messageInitError"]);

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

        // add mockconfig to window so we can easily access it later for testing
        // for example:
        // window.setSurveyConfig({ ...window.mockConfig, theme: { darkMode: true, values: { colors: { controlHighlight: "#ff00ff" } } } });
        // window.setSurveyConfig({questions: [...window.mockConfig.questions.slice(2,4)]});
        // window.setSurveyConfig({ ...window.mockConfig, labels: { questionsTitle: "Hi!" } });
        if (isDev(true)) {
            window.mockConfig = mockConfig;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useInit;
