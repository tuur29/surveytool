/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { AllAnswersType } from "../types/AnswerTypes";
import { DistributiveOmit } from "../utils/utils";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialAnswersState = {
    initialized: false,
    list: [] as AllAnswersType[],
    lastUpdate: 0,
    loadedFromStorage: false,
};
export type AnswersState = typeof initialAnswersState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

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

export const setAnswerFocus = (questionId: string, focussed: boolean) => ({
    type: "ANSWERS_SET_FOCUS" as const,
    questionId,
    focussed,
});

export type AnswersActions =
    | ReturnType<typeof initAnswers>
    | ReturnType<typeof resetAnswers>
    | ReturnType<typeof setAnswer>
    | ReturnType<typeof setAnswerFocus>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const answersReducer = (state: AnswersState = initialAnswersState, action: AnswersActions): AnswersState => {
    switch (action.type) {
        case "ANSWERS_INIT": {
            return {
                ...state,
                initialized: true,
                list: action.list,
                lastUpdate: action.lastUpdate || 0,
                loadedFromStorage: action.lastUpdate ? true : false,
            };
        }
        // Not used, see store middleware
        // case "ANSWERS_RESET": {
        //     return { ...initialAnswersState };
        // }
        case "ANSWERS_SET": {
            const { answer } = action;
            const newAnswersList = [...state.list]; // do not mutate original state
            const index = newAnswersList.findIndex((a) => a.questionId === answer.questionId); // find index of answer to edit
            const newAnswer = { ...answer, focussed: true } as AllAnswersType; // Add focussed flag
            newAnswersList[index > -1 ? index : newAnswersList.length] = newAnswer; // fallback to adding item as next one in the list
            return { ...state, list: newAnswersList, lastUpdate: Date.now() }; // replace answer
        }

        case "ANSWERS_SET_FOCUS": {
            const { questionId, focussed } = action;
            const newAnswersList = [...state.list];
            const index = newAnswersList.findIndex((a) => a.questionId === questionId);
            newAnswersList[index] = { ...newAnswersList[index], focussed };
            return { ...state, list: newAnswersList };
        }
        default: {
            return state;
        }
    }
};
