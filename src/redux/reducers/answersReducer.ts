import { AllAnswersType } from "../../types/AnswerTypes";
import { AnswersActions } from "../actions/answersActions";

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
            const index = newAnswersList.findIndex((a) => a.questionIdHash.includes(answer.questionIdHash)); // find index of answer to edit
            const newAnswer = { ...answer, focussed: true } as AllAnswersType; // Add focussed flag
            newAnswersList[index > -1 ? index : newAnswersList.length] = newAnswer; // fallback to adding item as next one in the list
            return { ...state, list: newAnswersList, lastUpdate: Date.now() }; // replace answer
        }

        case "ANSWERS_SET_FOCUS": {
            const { questionHash, focussed } = action;
            const newAnswersList = [...state.list];
            const index = newAnswersList.findIndex((a) => a.questionIdHash.includes(questionHash));
            newAnswersList[index] = { ...newAnswersList[index], focussed };
            return { ...state, list: newAnswersList };
        }
        default: {
            return state;
        }
    }
};
