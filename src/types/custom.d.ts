import { ConfigType } from "./ConfigTypes";

declare global {
    interface Window {
        surveyConfig: ConfigType | undefined;
        setSurveyConfig: (config: ConfigType) => void;
    }
}
