import { useState } from "react";
import { ConfigType } from "../types/ConfigTypes";

// TODO: debug why config is loaded twice
const useConfig = (): ConfigType | null => {
    const [config, setConfig] = useState<ConfigType | null>(null);
    const [loading, setLoading] = useState(false); // loading will remain true when an error occurs

    const url = (window as any).surveyConfig || "/config.json";

    if (!loading && !config) {
        setLoading(true);
        fetch(url).then((response) => {
            if (!response.ok) {
                // TODO: notify end user of errors
                console.error("Could not retrieve config", response.status);
                return;
            }

            response.json().then((data) => {
                // TODO: validate config (with ts types?)
                if (!data?.questions?.length) {
                    console.error("Retrieved data is not a valid config", data);
                    return;
                }

                setConfig(data);
                setLoading(false);
            });
        });
    }

    return config;
};

export default useConfig;
