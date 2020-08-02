/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, Dispatch, applyMiddleware } from "redux";
import { AllAnswersType } from "../types/AnswerTypes";
import { questionTypes } from "../types/QuestionTypes";
import { generateAnswerStorageKey } from "../utils/utils";
import { ActionsType, StoreType } from "./store";
import { initAnswers, AnswersState } from "./answersReducer";

const LogicMiddleware: Middleware = (store: StoreType) => (next: Dispatch<ActionsType>) => (
    action: ActionsType,
) => {
    switch (action.type) {
        // Prepopulate default or locally saved answers in store
        case "CONFIG_INIT": {
            // attempt to load from localstorage so answers are persisted between reloads
            try {
                const locallyStoredAnswers = localStorage.getItem(generateAnswerStorageKey(action.config.id));
                if (locallyStoredAnswers) {
                    const answers: AnswersState = JSON.parse(locallyStoredAnswers);
                    store.dispatch(initAnswers(answers.list, answers.lastUpdate));
                    break;
                }
            } catch (exception) {
                console.error("Something went wrong when loading previously stored answers", exception);
            }

            // or create a new set of placeholder answers
            const initialAnswers: AllAnswersType[] = action.config.questions.map((question) => {
                const baseAnswer = { questionId: question.id };
                switch (question.type) {
                    case questionTypes.single: {
                        return { ...baseAnswer, type: questionTypes.single, value: question.checkedByDefault || false };
                    }
                    case questionTypes.multiple: {
                        return { ...baseAnswer, type: questionTypes.multiple, values: question.defaultIds || [] };
                    }
                    case questionTypes.text: {
                        return { ...baseAnswer, type: questionTypes.text, value: "" };
                    }
                    case questionTypes.range: {
                        return { ...baseAnswer, type: questionTypes.range, value: question.default || 0 };
                    }
                }
            });
            store.dispatch(initAnswers(initialAnswers));
            break;
        }

        // Add config id to answers setter so we can save it to local storage
        case "ANSWERS_SET": {
            action.configId = store.getState().config.id;
            break;
        }
    }

    return next(action);
};

export const middlewares = applyMiddleware(LogicMiddleware);

// TODO: hook into setting page to results for posting to api and fetching data (reuse below code)
// if (!loading && !config) {
//     setLoading(true);
//     fetch(url).then((response) => {
//         if (!response.ok) {
//             console.error("Could not retrieve config", response.status);
//             return;
//         }

//         response.json().then((data) => {
//             if (!data?.questions?.length) {
//                 console.error("Retrieved data is not a valid config", data);
//                 return;
//             }

//             setConfig(data);
//             setLoading(false);
//         });
//     });
// }
