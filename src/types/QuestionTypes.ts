import { AllAnswersType } from "./AnswerTypes";

export enum questionTypes {
    single = "singleChoice",
    multiple = "multipleChoice",
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
    calcFunction?: (
        question: AllQuestionsType,
        answer: AllAnswersType,
    ) => number | undefined;
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.single;
    checkedByDefault?: boolean;
};

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.multiple;
    options: Options[];
    defaultIds?: string[]; // this should be the ids of the default selected options
    inputType: "radio" | "check" | "select";
};

// example: email, age
export type TextQuestionType = BaseQuestion & {
    type: questionTypes.text;
    inputType: "text" | "email" | "number";
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
    min: number;
    max: number;
    inputType: "slider" | "radio";
    default?: number;
    step?: number;
    direction?: RangeDirectionType; // only used on slider
    tickCount?: number; // only used on slider
};

export type AllQuestionsType =
    | SingleChoiceQuestionType
    | MultipleChoiceQuestionType
    | TextQuestionType
    | RangeQuestionType;
