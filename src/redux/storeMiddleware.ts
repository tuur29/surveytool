import { Middleware, Dispatch, applyMiddleware } from "redux";
import {
    flattenQuestionGroups,
    generateAnswerStorageKey,
    generateInitialAnswer,
    getAllQuestionsSelector,
    populateQuestionHash,
} from "../utils/utils";
import { AllAnswersType } from "../types/AnswerTypes";
import { ActionsType, StoreApiType } from "./store";
import { initAnswers } from "./actions/answersActions";
import { showResult, updateRestartTimer } from "./actions/resultActions";

const AllLogicMiddleware: Middleware = (store: StoreApiType) => (next: Dispatch<ActionsType>) => (
    action: ActionsType,
) => {
    switch (action.type) {
        // Prepopulate default or locally saved answers in store
        case "CONFIG_INIT": {
            // attempt to load from localstorage so answers are persisted between reloads
            const localAnswersString = localStorage.getItem(generateAnswerStorageKey(action.config.id));
            const loadedAnswers: AllAnswersType[] =
                localAnswersString && localAnswersString.length ? JSON.parse(localAnswersString).list : [];

            // or create a new set of placeholder answers
            const initialAnswers = flattenQuestionGroups(action.config.groups)
                .map(populateQuestionHash)
                .map(generateInitialAnswer);

            // merge loaded and initial answers
            const mergedAnswers = initialAnswers.map((answer) => {
                const foundLoadedAnswer = loadedAnswers.find(
                    (loadedAnswer) =>
                        loadedAnswer.questionIdHash === answer.questionIdHash && loadedAnswer.type === answer.type,
                );
                return foundLoadedAnswer || answer;
            });

            store.dispatch(initAnswers(mergedAnswers));
            break;
        }

        case "ANSWERS_RESET": {
            const questions = getAllQuestionsSelector(store.getState());
            const initialAnswers = questions.map(generateInitialAnswer);
            // Reuse initAnswers instead of dispatching the reset action
            store.dispatch(initAnswers(initialAnswers));
            return;
        }

        case "ANSWERS_SET": {
            // Hide results when changing an answer
            if (
                store.getState().config.result.enableControls &&
                store.getState().config.result.hideResultsAfterUpdate
            ) {
                store.dispatch(showResult(false));
            }
            break;
        }

        case "RESULT_SHOW": {
            // Reset the update timer when it's no longer visible
            if (!action.visible && store.getState().result.restartTimestamp) {
                store.dispatch(updateRestartTimer(null));
            }
            break;
        }
    }

    return next(action);
};

export const middlewares = applyMiddleware(AllLogicMiddleware);
