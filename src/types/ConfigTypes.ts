import { DefaultTheme } from "styled-components";
import { DeepPartial } from "../utils/utils";
import { LabelType } from "../utils/labels";

export enum answerTypes {
    single = "singleChoice",
    multiple = "multipleChoice",
    text = "text",
    slider = "slider",
}

type Hintable = {
    title: string;
    hints?: string[]; // %h placeholder in title is replaced with indexed hint
};

type PossibleAnswer = {
    id: string;
} & Hintable;

type BaseQuestion = {
    id: string;
    title: string;
    // TODO: weights?
    // TODO: required answer
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.single;
    checkedByDefault?: boolean;
};

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.multiple;
    answers: PossibleAnswer[];
    inputType: "radio" | "check" | "select";
    calcFunction?: (
        question: MultipleChoiceQuestionType,
        answerIds: string[],
        answerValues: string[],
        answerIndex: number[],
    ) => number | undefined;
};

// example: email, age
export type TextQuestionType = BaseQuestion & {
    type: answerTypes.text;
    format: "text" | "email" | "number";
    placeholder?: string;
    // TODO: add rows option?
};

// example: ratings
export type SliderQuestionType = BaseQuestion & {
    type: answerTypes.slider;
    min: number;
    max: number;
    default?: number;
    step?: number;
};

export type AllQuestionsType =
    | SingleChoiceQuestionType
    | MultipleChoiceQuestionType
    | TextQuestionType
    | SliderQuestionType;

export type ConfigType = {
    id: string; // used to differentiate multiple surveys (or versions) on same domain
    questions: AllQuestionsType[];
    theme: DeepPartial<{
        darkMode: boolean;
        values: DefaultTheme;
    }>;
    labels: Partial<Record<LabelType, string | null>>,
};
