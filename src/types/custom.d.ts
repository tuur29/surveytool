import { ConfigType } from "./ConfigTypes";

declare global {
    interface Window {
        surveyConfig?: ConfigType; // used by user for configuration on init
        setSurveyConfig: (config: ConfigType) => void; // dynamically update theme

        mockConfig?: ConfigType; // set for testing purposes when in dev mode
    }
}
