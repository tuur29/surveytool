import { Dispatch } from "redux";
import { debounce } from "lodash";
import hash from "object-hash";
import { calculateScore } from "../utils/calculator";
import { AllAnswersType } from "../types/AnswerTypes";
import { AnswerPostData } from "../types/DataTypes";
import { AnswerDataUrl } from "../types/ResultTypes";
import {
    generateAnswerStorageKey,
    replaceValues,
    fetchAnswerData,
    getAllQuestionsSelector,
    getInitializedSelector,
} from "../utils/utils";
import { StoreApiType } from "./store";
import { setResult, updateRestartTimer } from "./actions/resultActions";

// This is an extra safety measure against loops because every dispatch triggers another listener
// The actions here should be manually checked for changes below.
type SafeActions = ReturnType<typeof setResult> | ReturnType<typeof updateRestartTimer>;
type SafeStoreApiType = Omit<StoreApiType, "dispatch"> & {
    dispatch: Dispatch<SafeActions>;
};

// ----------------------------------------------------------------------
// calculateScoreListener
// ----------------------------------------------------------------------

const debouncedFetchAnswerData = debounce(
    (url: AnswerDataUrl, data: AnswerPostData) => fetchAnswerData(url, data),
    500,
);

let prevScoreAnswerList: AllAnswersType[];
let prevScoreHash = "";

/**
 * Calculate new score when results are visible (links to ANSWERS_SET and dispatches RESULT_SET). Why is this here?
 * - Because we can circumvent complexity in the middleware. However we modify answers, it will always be picked up here.
 * - This dispatch is an end state and the other option, redirect, feels wrong inside middleware
 */
const calculateScoreListener = (store: SafeStoreApiType): void => {
    const state = store.getState();

    // When viewing results or after, when answers change
    if (getInitializedSelector(state) && state.result.showResult && state.answers.list !== prevScoreAnswerList) {
        prevScoreAnswerList = state.answers.list;

        // Restart timer when results were visible and answers change, also starts timer when showing results
        if (state.config.result.restartTimeout) {
            store.dispatch(updateRestartTimer(Date.now() + state.config.result.restartTimeout * 1000));
        }

        // Create and handle new score
        const newScore = calculateScore(getAllQuestionsSelector(state), state.answers.list, state.config);
        const newScoreHash = hash(newScore);
        if (newScoreHash !== prevScoreHash) {
            prevScoreHash = newScoreHash;

            // Replace built in results page with a custom redirect
            // this causes instant reloads when showResult was saved to localstorage (only in dev mode)
            if (state.config.result.redirectUrl) {
                window.location.href = replaceValues(state.config.result.redirectUrl, newScore)!;
                return;
            }

            // Post answers and score to endpoint or custom handler
            const postData: AnswerPostData = {
                configId: state.config.id,
                score: newScore,
                answers: state.answers.list,
            };
            if (state.config.result.postDataUrl) {
                // use a debounced callback to avoid spamming the endpoint when changing a submitted result
                debouncedFetchAnswerData(state.config.result.postDataUrl, postData);
            }
            if (state.config.settings.onAnswerSubmit) {
                state.config.settings.onAnswerSubmit(postData);
            }

            store.dispatch(setResult(newScore));
        }
    }
};

// ----------------------------------------------------------------------
// persistAnswerListener
// ----------------------------------------------------------------------

let prevPersistAnswerList: AllAnswersType[];

const persistAnswerListener = (store: SafeStoreApiType): void => {
    const state = store.getState();

    if (prevPersistAnswerList !== state.answers.list && state.config.initialized && state.answers.initialized) {
        localStorage.setItem(generateAnswerStorageKey(state.config.id), JSON.stringify(state.answers));
    }
};

// ----------------------------------------------------------------------
// Combine
// ----------------------------------------------------------------------

export const listeners = [calculateScoreListener, persistAnswerListener];
