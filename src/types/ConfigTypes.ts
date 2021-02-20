import { DefaultTheme } from "styled-components";
import { DeepPartial } from "../utils/utils";
import { LabelType } from "../utils/labels";
import { QuestionGroup } from "./QuestionTypes";
import { AllResultContentType, AnswerDataUrl } from "./ResultTypes";

export type ConfigType = {
    /**
     * Every configuration should have a unique id. The id is used for the following:
     * - A user's answers are saved locally when they are filling in the form. Their progress is saved, so a reload doesn't clear their input. This data is saved based on the id.
     * - When configured, saving the users data to a server will also include the config id so the backend knows which form is being saved.
     */
    id: string;
    labels: Partial<Record<LabelType, string | null>>;
    theme: DeepPartial<{
        darkMode: boolean;
        values: DefaultTheme;
    }>;
    groups: QuestionGroup[];
    result: {
        /** When filled in the tool will save the user's result to this URL. */
        postDataUrl?: AnswerDataUrl;
        /** Instead of displaying the results page, the tool will redirect the user to this URL. */
        redirectUrl?: AnswerDataUrl;
        /** Enables the user's ability to edit their answers after submitting them. Defaults to `false`. */
        enableControls?: boolean;
        /** An array containing the smallest and largest possible score. This is sometimes used when customizing the results page content. */
        scoreDomain?: number[];
        /** The number of seconds before the survey restarts after results are shown. */
        restartTimeout?: number;
        content?: AllResultContentType[];
    };
};
