import { calculateScore } from "../utils/calculator";
import { AllAnswersType } from "../types/AnswerTypes";
import { StoreType } from "./store";
import { setResult } from "./resultReducer";

let previousAnswersList: AllAnswersType[];
let previousScore = 0;

// calculate new score when results are visible (links to ANSWERS_SET and dispatches ANSWERS_SET)
const scoreListener = (store: StoreType): void => {
    const state = store.getState();

    if (state.result.showResult && previousAnswersList !== state.answers.list) {
        const newScore = calculateScore(state.config.questions, state.answers.list);
        previousAnswersList = state.answers.list;

        if (newScore !== previousScore) {
            previousScore = newScore;
            store.dispatch(setResult(newScore));
        }
    }
};

export const listeners = [scoreListener];
