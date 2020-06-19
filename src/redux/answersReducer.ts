/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { AllAnswersType } from "../types/AnswerTypes";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialAnswersState = {
    list: [] as AllAnswersType[],
    lastUpdate: 0,
};
export type AnswersState = typeof initialAnswersState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const resetAnswers = () => ({
    type: "ANSWERS_RESET" as const,
});

export const setAnswer = (answer: AllAnswersType) => ({
    type: "ANSWERS_SET" as const,
    answer,
});

export type AnswersActions = ReturnType<typeof resetAnswers> | ReturnType<typeof setAnswer>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const answersReducer = (state: AnswersState = initialAnswersState, action: AnswersActions): AnswersState => {
    // TODO: persists and load each value to / from localstorage

    switch (action.type) {
        case "ANSWERS_SET": {
            const { answer } = action;
            const newAnswersList = [...state.list]; // do not mutate original state
            const index = newAnswersList.findIndex((a) => a.questionId === answer.questionId); // find index of answer to edit
            newAnswersList[index > -1 ? index : newAnswersList.length] = answer; // fallback to adding item as next one in the list
            return { ...state, list: newAnswersList, lastUpdate: Date.now() }; // replace answer
        }
        case "ANSWERS_RESET": {
            return { ...initialAnswersState };
        }
        default: {
            return state;
        }
    }
};
