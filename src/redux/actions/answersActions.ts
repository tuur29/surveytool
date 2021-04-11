/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { AllAnswersType } from "../../types/AnswerTypes";
import { DistributiveOmit } from "../../utils/utils";

export const initAnswers = (list: AllAnswersType[], lastUpdate?: number) => ({
    type: "ANSWERS_INIT" as const,
    list,
    lastUpdate,
});

export const resetAnswers = () => ({
    type: "ANSWERS_RESET" as const,
});

export const setAnswer = (answer: DistributiveOmit<AllAnswersType, "focussed">) => ({
    type: "ANSWERS_SET" as const,
    answer,
});

export const setAnswerFocus = (questionHash: string, focussed: boolean) => ({
    type: "ANSWERS_SET_FOCUS" as const,
    questionHash,
    focussed,
});

export type AnswersActions =
    | ReturnType<typeof initAnswers>
    | ReturnType<typeof resetAnswers>
    | ReturnType<typeof setAnswer>
    | ReturnType<typeof setAnswerFocus>;
