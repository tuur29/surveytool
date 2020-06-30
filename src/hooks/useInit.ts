import { useEffect } from "react";
import { ConfigType } from "../types/ConfigTypes";
import { mockConfig } from "../utils/mock";
import { isProduction } from "../utils/utils";
import { useStoreDispatch } from "../redux/store";
import { initConfig } from "../redux/configReducer";

/**
 * Contains logic to initialize the app, should be called in root component
 */
const useInit = (): void => {
    const dispatch = useStoreDispatch();

    useEffect(() => {
        // allow changing config after app init
        // TODO: app crashes when setting a new config with different questions
        window.setSurveyConfig = (config: Partial<ConfigType>) => {
            // TODO: improve config validation (with ts types?)
            if (config?.questions && config.questions.length > 0) {
                dispatch(initConfig(config as ConfigType));
            } else {
                // TODO: notify end user of errors
                console.error("Supplied data is not a valid config", config);
            }
        };

        // init with already defined config or mockdata on dev mode
        const initialConfig = window.surveyConfig || (isProduction() ? null : mockConfig);
        if (initialConfig) dispatch(initConfig(initialConfig as ConfigType));

        // add mockconfig to window so we can easily access it later for testing
        // for example:
        // window.setSurveyConfig({ ...window.mockConfig, theme: { darkMode: true, values: { colors: { controlHighlight: "#ff00ff" } } } });
        // window.setSurveyConfig({questions: [...window.mockConfig.questions.slice(2,4)]});
        // window.setSurveyConfig({ ...window.mockConfig, labels: { questionsTitle: "Hi!" } });
        if (!isProduction()) {
            window.mockConfig = mockConfig;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useInit;
