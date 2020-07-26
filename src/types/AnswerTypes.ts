import { answerTypes } from "./QuestionTypes";

type BaseAnswerType = {
    questionId: string;
};

export type SingleChoiceAnswerType = BaseAnswerType & {
    type: answerTypes.single;
    value: boolean;
};

export type MultipleChoiceAnswerType = BaseAnswerType & {
    type: answerTypes.multiple;
    values: string[]; // contains a list of the ids which have a true value
};

export type TextAnswerType = BaseAnswerType & {
    type: answerTypes.text;
    value: string;
};

export type RangeAnswerType = BaseAnswerType & {
    type: answerTypes.range;
    value: number;
};

export type AllAnswersType = SingleChoiceAnswerType | MultipleChoiceAnswerType | TextAnswerType | RangeAnswerType;
