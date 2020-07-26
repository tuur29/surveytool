import { DefaultTheme } from "styled-components";
import { DeepPartial } from "../utils/utils";
import { LabelType } from "../utils/labels";
import { AllQuestionsType } from "./QuestionTypes";
import { AllResultsType } from "./ResultTypes";

export type ConfigType = {
    id: string; // used to differentiate multiple surveys (or versions) on same domain
    labels: Partial<Record<LabelType, string | null>>;
    theme: DeepPartial<{
        darkMode: boolean;
        values: DefaultTheme;
    }>;
    questions: AllQuestionsType[];
    results: { // TODO: add default label when results, content or postPageUrl is not configured
        saveDataUrl?: string; // send answers to a custom server
        redirectUrl?: string; // redirect to custom results page
        disableControls?: boolean; // defaults to true, disables all answer controls when results are shown
        content?: AllResultsType[], // content is shown when postPageUrl is undefined
    }
};
