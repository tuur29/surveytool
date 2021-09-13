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
        case "CONFIG_INIT": {
            // Prepopulate default or locally saved answers in store
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
            // Reuse initAnswers instead of dispatching the reset action
            const questions = getAllQuestionsSelector(store.getState());
            const initialAnswers = questions.map(generateInitialAnswer);
            store.dispatch(initAnswers(initialAnswers));
            return;
        }

        case "ANSWERS_SET": {
            // Hide results when changing an answer
            const { enableControls, hideResultsAfterUpdate } = store.getState().config.result;
            if (enableControls && hideResultsAfterUpdate) {
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

        case "MESSAGES_ADD": {
            const { customMessageHandler } = store.getState().config.settings;
            if (customMessageHandler) {
                try {
                    const stopErrorInternally = !customMessageHandler(action.messages);
                    // Do not add message to store otherwise duplicate visualization will occur
                    if (stopErrorInternally) return;
                } catch (exception) {
                    console.error(`Custom message handler failed`, exception);
                }
            }
        }
    }

    return next(action);
};

export const middlewares = applyMiddleware(AllLogicMiddleware);
