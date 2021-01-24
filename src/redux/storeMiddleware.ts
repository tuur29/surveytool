import { Middleware, Dispatch, applyMiddleware } from "redux";
import { generateAnswerStorageKey, generateInitialAnswers } from "../utils/utils";
import { AllAnswersType } from "../types/AnswerTypes";
import { ActionsType, StoreApiType } from "./store";
import { initAnswers } from "./actions/answersActions";

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
            const initialAnswers = generateInitialAnswers(action.config.questions);

            // merge loaded and initial answers
            const mergedAnswers = initialAnswers.map((answer) => {
                const foundLoadedAnswer = loadedAnswers.find(
                    (loadedAnswer) =>
                        loadedAnswer.questionId === answer.questionId && loadedAnswer.type === answer.type,
                );
                return foundLoadedAnswer || answer;
            });

            store.dispatch(initAnswers(mergedAnswers));
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
