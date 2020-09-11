import { DefaultTheme } from "styled-components";
import { DeepPartial } from "../utils/utils";
import { LabelType } from "../utils/labels";
import { AllQuestionsType } from "./QuestionTypes";
import { AllResultContentType, AnswerDataUrl } from "./ResultTypes";

export type ConfigType = {
    id: string; // used to differentiate multiple surveys (or versions) on same domain
    labels: Partial<Record<LabelType, string | null>>;
    theme: DeepPartial<{
        darkMode: boolean;
        values: DefaultTheme;
    }>;
    questions: AllQuestionsType[];
    result: {
        // TODO: add default label when results, content or postPageUrl is not configured
        postDataUrl?: AnswerDataUrl; // send answers to a custom server
        redirectUrl?: AnswerDataUrl; // redirect to custom results page, only supports GET; variant
        disableControls?: boolean; // TODO: defaults to true, disables all answer controls when results are shown
        scoreDomain?: number[]; // [min, max] values only used for formatting scores (scoreCounter, graph, placeholder)
        content?: AllResultContentType[]; // content is shown when postPageUrl is undefined
    };
};
