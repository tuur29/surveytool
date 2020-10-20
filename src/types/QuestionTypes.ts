import { AllAnswersType } from "./AnswerTypes";

export enum questionTypes {
    single = "single",
    multiple = "multiple",
    text = "text",
    range = "range",
}

type Hintable = {
    title: string;
    hints?: string[]; // %h placeholder in title is replaced with indexed hint
};

type Options = {
    id: string;
} & Hintable;

type BaseQuestion = {
    id: string;
    title: string;
    required?: boolean;
    calcFunction?: (question: AllQuestionsType, answer: AllAnswersType) => number | undefined;
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.single;
    checkedByDefault?: boolean;
};

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
    // TODO: add rows option?
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
