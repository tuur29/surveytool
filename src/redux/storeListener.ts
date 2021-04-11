import { debounce } from "lodash";
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

// ----------------------------------------------------------------------
// calculateScoreListener
// ----------------------------------------------------------------------

const debouncedFetchAnswerData = debounce(
    (url: AnswerDataUrl, data: AnswerPostData) => fetchAnswerData(url, data),
    500,
);

let prevScoreAnswerList: AllAnswersType[];
let prevScoreValue = 0;

// calculate new score when results are visible (links to ANSWERS_SET and dispatches RESULT_SET)
const calculateScoreListener = (store: StoreApiType): void => {
    const state = store.getState();

    if (getInitializedSelector(state) && state.result.showResult && prevScoreAnswerList !== state.answers.list) {
        const newScore = calculateScore(getAllQuestionsSelector(state), state.answers.list);
        prevScoreAnswerList = state.answers.list;

        if (newScore !== prevScoreValue) {
            prevScoreValue = newScore;

            // Replace built in results page with a custom redirect
            // this causes instant reloads when showResult was saved to localstorage (only in dev mode)
            if (state.config.result.redirectUrl) {
                window.location.href = replaceValues(state.config.result.redirectUrl, { score: newScore })!;
                return;
            }

            // Post answers and score to endpoint
            // use a debounced callback to avoid spamming the endpoint when changing a submitted result
            if (state.config.result.postDataUrl) {
                debouncedFetchAnswerData(state.config.result.postDataUrl, {
                    configId: state.config.id,
                    score: newScore,
                    answers: state.answers.list,
                });
            }

            store.dispatch(setResult(newScore));

            // Start or restart timer when configured
            if (state.config.result.restartTimeout) {
                store.dispatch(updateRestartTimer(Date.now() + state.config.result.restartTimeout * 1000));
            }
        }
    }
};

// ----------------------------------------------------------------------
// persistAnswerListener
// ----------------------------------------------------------------------

let prevPersistAnswerList: AllAnswersType[];

// persist to localstorage and return
const persistAnswerListener = (store: StoreApiType): void => {
    const state = store.getState();

    if (prevPersistAnswerList !== state.answers.list && state.config.initialized && state.answers.initialized) {
        localStorage.setItem(generateAnswerStorageKey(state.config.id), JSON.stringify(state.answers));
    }
};

// ----------------------------------------------------------------------
// Combine
// ----------------------------------------------------------------------

export const listeners = [calculateScoreListener, persistAnswerListener];
