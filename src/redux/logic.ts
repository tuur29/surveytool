/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { AllAnswersType } from "../types/AnswerTypes";
import { answerTypes } from "../types/ConfigTypes";
import { ActionsType, StateType } from "./store";
import { initAnswers } from "./answersReducer";

export const LogicMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<ActionsType>, StateType>) => (
    next: Dispatch<ActionsType>,
) => (action: ActionsType) => {
    // TODO: persists and load each value to / from localstorage (config should have ID?)
    switch (action.type) {
        case "CONFIG_INIT": {
            const initialAnswers: AllAnswersType[] = action.config.questions.map((question) => {
                const baseAnswer = { questionId: question.id };
                switch (question.type) {
                    case answerTypes.single: {
                        return { ...baseAnswer, type: answerTypes.single, value: question.checkedByDefault || false };
                    }
                    case answerTypes.multiple: {
                        return { ...baseAnswer, type: answerTypes.multiple, values: [] };
                    }
                    // TODO: implement for other question types
                    case answerTypes.slider:
                    case answerTypes.text: {
                        return ({ ...baseAnswer, type: question.type } as unknown) as AllAnswersType;
                    }
                }
            });
            api.dispatch(initAnswers(initialAnswers));
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
