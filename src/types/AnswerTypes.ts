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
    value: boolean[]; // TODO: we should map this type to a index field in the case of radio and select, add new SingleMulipleChoiceQuestion type?
}

export type AllAnswersType = SingleChoiceAnswerType | MultipleChoiceAnswerType; // TODO: add other answertypes
