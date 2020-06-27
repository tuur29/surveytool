import { answerTypes } from "./ConfigTypes";

type BaseAnswerType = {
    questionId: string;
}

export type SingleChoiceAnswerType = BaseAnswerType & {
    type: answerTypes.single;
    value: boolean;
}

export type MultipleChoiceAnswerType = BaseAnswerType & {
    type: answerTypes.multiple;
    values: string[]; // contains a list of the ids which have a true value
}

export type AllAnswersType = SingleChoiceAnswerType | MultipleChoiceAnswerType; // TODO: add other answertypes
