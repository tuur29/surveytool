import { useState } from "react";
import { ConfigType } from "../types/ConfigTypes";
import { mockConfig } from "../utils/mock";
import { isProduction } from "../utils/utils";

const useConfig = (): ConfigType | null => {
    const [config, setConfig] = useState<ConfigType | null>(
        window.surveyConfig || (isProduction() ? null : mockConfig),
    );

    // TODO: put config in store instead
    window.setSurveyConfig = (config: ConfigType) => {
        // TODO: validate config (with ts types?)
        if (!config?.questions?.length) {
            setConfig(config);
        } else {
            // TODO: notify end user of errors
            console.error("Supplied data is not a valid config", config);
        }
    };

    // TODO: reuse this later for posting data to API
    // if (!loading && !config) {
    //     setLoading(true);
    //     fetch(url).then((response) => {
    //         if (!response.ok) {
    //             console.error("Could not retrieve config", response.status);
    //             return;
    //         }

    //         response.json().then((data) => {
    //             if (!data?.questions?.length) {
    //                 console.error("Retrieved data is not a valid config", data);
    //                 return;
    //             }

    //             setConfig(data);
    //             setLoading(false);
    //         });
    //     });
    // }

    return config;
};

export default useConfig;
