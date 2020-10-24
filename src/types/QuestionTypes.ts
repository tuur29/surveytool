import { AllAnswersType } from "./AnswerTypes";

export enum questionTypes {
    single = "single",
    multiple = "multiple",
    text = "text",
    range = "range",
}

type Hintable = {
    title: string;
    /**
     * Each usage of the `{hint}` placeholder needs to have a string in this array. Optional if no hints are used.
     */
    hints?: string[];
};

type BaseQuestion = {
    /**
     * Should be unique in a configuration. This links the question to it's answer.
     */
    id: string;
    /**
     * The question being asked to the user. This string can contain multiple `{hint}` placeholders.
     */
    title: string;
    /**
     * Required questions need to be filled in by the user before they can submit their answers.
     */
    required?: boolean;
    /**
     * Optional function that can be used to override the default score calculations.
     */
    calcFunction?: (question: AllQuestionsType, answer: AllAnswersType) => number | undefined;
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.single;
    /**
     * Causes the checkbox to already be checked when the user first loads the form.
     */
    checkedByDefault?: boolean;
};

type Options = {
    id: string;
} & Hintable;

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.multiple;
    inputType: "radio" | "check" | "select";
    options: Options[];
    defaultIds?: string[]; // this should be the ids of the default selected options
};

// example: email, age
export type TextQuestionType = BaseQuestion & {
    inputType: "text" | "email" | "number";
    type: questionTypes.text;
    placeholder?: string;
    customValidation?: {
        regex?: string;
        error?: string;
    };
};

export type RangeDirectionType = "increase" | "decrease"; // increase is default

// example: ratings
export type RangeQuestionType = BaseQuestion & {
    type: questionTypes.range;
    inputType: "slider" | "radio";
    min: number;
    max: number;
    default?: number;
    step?: number;
    direction?: RangeDirectionType; // only used on slider
    tickCount?: number; // only used on slider
    tickValues?: number[]; // overrides tickCount
    tickLabels?: (string | null)[];
};

export type AllQuestionsType =
    | SingleChoiceQuestionType
    | MultipleChoiceQuestionType
    | TextQuestionType
    | RangeQuestionType;
