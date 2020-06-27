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

    // allow changing config after app init
    window.setSurveyConfig = (config: ConfigType) => {
        // TODO: improve config validation (with ts types?)
        if (!config?.questions?.length) {
            dispatch(initConfig(config));
        } else {
            // TODO: notify end user of errors
            console.error("Supplied data is not a valid config", config);
        }
    };

    // init with already defined config or mockdata on dev mode
    const initialConfig = window.surveyConfig || (isProduction() ? null : mockConfig);
    if (initialConfig) dispatch(initConfig(initialConfig));
};

export default useInit;
