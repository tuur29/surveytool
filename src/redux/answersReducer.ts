/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { AllAnswersType } from "../types/AnswerTypes";
import { generateAnswerStorageKey } from "../utils/utils";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialAnswersState = {
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

export const setAnswer = (answer: AllAnswersType) => ({
    type: "ANSWERS_SET" as const,
    answer,
    configId: undefined as string | undefined, // used for persisting answers, set in logic middleware
});

export type AnswersActions =
    | ReturnType<typeof initAnswers>
    | ReturnType<typeof resetAnswers>
    | ReturnType<typeof setAnswer>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

// TODO: provide a way to clear answers from localstorage
export const answersReducer = (state: AnswersState = initialAnswersState, action: AnswersActions): AnswersState => {
    switch (action.type) {
        case "ANSWERS_INIT": {
            return {
                ...state,
                list: action.list,
                lastUpdate: action.lastUpdate || 0,
                loadedFromStorage: action.lastUpdate ? true : false,
            };
        }
        case "ANSWERS_RESET": {
            return { ...initialAnswersState };
        }
        case "ANSWERS_SET": {
            const { answer } = action;
            const newAnswersList = [...state.list]; // do not mutate original state
            const index = newAnswersList.findIndex((a) => a.questionId === answer.questionId); // find index of answer to edit
            newAnswersList[index > -1 ? index : newAnswersList.length] = answer; // fallback to adding item as next one in the list
            const newState = { ...state, list: newAnswersList, lastUpdate: Date.now() }; // replace answer

            // persist to localstorage and return
            localStorage.setItem(generateAnswerStorageKey(action.configId || ""), JSON.stringify(newState));
            return newState;
        }
        default: {
            return state;
        }
    }
};
