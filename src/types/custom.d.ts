import { ConfigType } from "./ConfigTypes";

declare global {
    interface Window {
        surveyConfig?: Partial<ConfigType>; // used by user for configuration on init
        setSurveyConfig: (config: Partial<ConfigType>) => void; // dynamically update theme

        mockConfig?: Partial<ConfigType>; // set for testing purposes when in dev mode
    }
}
