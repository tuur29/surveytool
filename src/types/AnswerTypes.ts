import { questionTypes } from "./QuestionTypes";

type BaseAnswerType = {
    questionId: string;
};

export type SingleChoiceAnswerType = BaseAnswerType & {
    type: questionTypes.single;
    value: boolean;
};

export type MultipleChoiceAnswerType = BaseAnswerType & {
    type: questionTypes.multiple;
    values: string[]; // contains a list of the ids which have a true value
};

export type TextAnswerType = BaseAnswerType & {
    type: questionTypes.text;
    value: string;
};

export type RangeAnswerType = BaseAnswerType & {
    type: questionTypes.range;
    value: number;
};

export type AllAnswersType = SingleChoiceAnswerType | MultipleChoiceAnswerType | TextAnswerType | RangeAnswerType;
