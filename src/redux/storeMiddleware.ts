/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, Dispatch, applyMiddleware } from "redux";
import { AllAnswersType } from "../types/AnswerTypes";
import { questionTypes } from "../types/QuestionTypes";
import { generateAnswerStorageKey, generateInitialAnswers } from "../utils/utils";
import { ActionsType, StoreType } from "./store";
import { initAnswers, AnswersState } from "./answersReducer";

const AllLogicMiddleware: Middleware = (store: StoreType) => (next: Dispatch<ActionsType>) => (action: ActionsType) => {
    switch (action.type) {
        // Prepopulate default or locally saved answers in store
        case "CONFIG_INIT": {
            // attempt to load from localstorage so answers are persisted between reloads
            try {
                const locallyStoredAnswers = localStorage.getItem(generateAnswerStorageKey(action.config.id));
                if (locallyStoredAnswers && locallyStoredAnswers.length) {
                    const answers: AnswersState = JSON.parse(locallyStoredAnswers);
                    store.dispatch(initAnswers(answers.list, answers.lastUpdate));
                    break;
                }
            } catch (exception) {
                console.error("Something went wrong when loading previously stored answers", exception);
            }

            // or create a new set of placeholder answers
            const initialAnswers = generateInitialAnswers(action.config.questions);
            store.dispatch(initAnswers(initialAnswers));
            break;
        }

        case "ANSWERS_RESET": {
            const questions = store.getState().config.questions;
            const initialAnswers = generateInitialAnswers(questions);
            // Reuse initAnswers instead of dispatching the reset action
            store.dispatch(initAnswers(initialAnswers));
            return;
        }
    }

    return next(action);
};

export const middlewares = applyMiddleware(AllLogicMiddleware);
