import { calculateScore } from "../utils/calculator";
import { AllAnswersType } from "../types/AnswerTypes";
import { generateAnswerStorageKey } from "../utils/utils";
import { StoreType } from "./store";
import { setResult } from "./resultReducer";

// ----------------------------------------------------------------------
// calculateScoreListener
// ----------------------------------------------------------------------

let prevScoreAnswerList: AllAnswersType[];
let prevScoreValue = 0;

// calculate new score when results are visible (links to ANSWERS_SET and dispatches ANSWERS_SET)
const calculateScoreListener = (store: StoreType): void => {
    const state = store.getState();

    if (state.result.showResult && prevScoreAnswerList !== state.answers.list) {
        const newScore = calculateScore(state.config.questions, state.answers.list);
        prevScoreAnswerList = state.answers.list;

        if (newScore !== prevScoreValue) {
            prevScoreValue = newScore;
            store.dispatch(setResult(newScore));
        }
    }
};

// ----------------------------------------------------------------------
// persistAnswerListener
// ----------------------------------------------------------------------

let prevPersistAnswerList: AllAnswersType[];

// persist to localstorage and return
const persistAnswerListener = (store: StoreType): void => {
    const state = store.getState();

    if (prevPersistAnswerList !== state.answers.list && state.config.initialized && state.answers.initialized) {
        localStorage.setItem(generateAnswerStorageKey(state.config.id), JSON.stringify(state.answers));
    }
};

// ----------------------------------------------------------------------
// Combine
// ----------------------------------------------------------------------

export const listeners = [calculateScoreListener, persistAnswerListener];
