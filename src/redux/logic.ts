/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { AllAnswersType } from "../types/AnswerTypes";
import { answerTypes } from "../types/ConfigTypes";
import { generateAnswerStorageKey } from "../utils/utils";
import { ActionsType, StateType } from "./store";
import { initAnswers, AnswersState } from "./answersReducer";

export const LogicMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<ActionsType>, StateType>) => (
    next: Dispatch<ActionsType>,
) => (action: ActionsType) => {
    switch (action.type) {

        // Prepopulate default or locally saved answers in store
        case "CONFIG_INIT": {
            // attempt to load from 
            try {
                const locallyStoredAnswers = localStorage.getItem(generateAnswerStorageKey(action.config.id));
                if (locallyStoredAnswers) {
                    const answers: AnswersState = JSON.parse(locallyStoredAnswers);
                    store.dispatch(initAnswers(answers.list, answers.lastUpdate));
                    break;
                }
            } catch(e) {
                console.error("Something went wrong when loading previously stored answers", e);
            }

            // create a new set of placeholder answers
            const initialAnswers: AllAnswersType[] = action.config.questions.map((question) => {
                const baseAnswer = { questionId: question.id };
                switch (question.type) {
                    case answerTypes.single: {
                        return { ...baseAnswer, type: answerTypes.single, value: question.checkedByDefault || false };
                    }
                    case answerTypes.multiple: {
                        return { ...baseAnswer, type: answerTypes.multiple, values: [] };
                    }
                    case answerTypes.text: {
                        return { ...baseAnswer, type: answerTypes.text, value: "" };
                    }
                    case answerTypes.slider: {
                        return { ...baseAnswer, type: answerTypes.slider, value: question.default || 0 };
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
