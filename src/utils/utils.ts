import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { AllQuestionsType, QuestionGroup, questionTypes } from "../types/QuestionTypes";
import { AllAnswersType } from "../types/AnswerTypes";
import { AnswerPostData } from "../types/DataTypes";
import { AnswerDataUrl } from "../types/ResultTypes";
import { ActionsType, StateType } from "../redux/store";
import { resetAnswers } from "../redux/actions/answersActions";
import { showResult, updateRestartTimer } from "../redux/actions/resultActions";
import { ValuesType } from "./labels";

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------

export const resultAnimationTotalFrames = 10;
export const resultAnimationFrameLength = 65;
export const graphHighlightId = "highlight";

// ----------------------------------------------------------------------
// Helper methods
// ----------------------------------------------------------------------

export const isDev = (allowOnDemo?: boolean): boolean =>
    process.env.NODE_ENV !== "production" || (!!allowOnDemo && !!process.env.REACT_APP_DEMO);

export const generateAnswerStorageKey = (configId: string): string => `surveyTool-answers-${configId}`;

export const generateThemeStorageKey = (configId: string): string => `surveyTool-theme-${configId}`;

export const generateShowResultStorageKey = (): string => `surveyTool-showresult`;

export const formatTimestamp = (timestamp: number, localeId: string | null | undefined): string =>
    new Intl.DateTimeFormat(localeId || "default", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(timestamp));

// Create a new set of placeholder answers
export const generateInitialAnswers = (questions: AllQuestionsType[]): AllAnswersType[] =>
    // eslint-disable-next-line array-callback-return
    questions.map((question) => {
        const baseAnswer = { questionId: question.id, focussed: false };
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

export const flattenQuestionGroups = (groups: QuestionGroup[]): AllQuestionsType[] =>
    groups.reduce<AllQuestionsType[]>((list, group) => [...list, ...group.questions], []);

/**
 * Will replace {key1} inside a string with the provided value for the key
 *
 * @example replaceValues("Congrats with your {score}% score!", { score: 95 }) => "Congrats with your 95% score!"
 */
export const replaceValues = (label?: string | null, values?: ValuesType, replaceAll = true): string | null => {
    if (!label) return null;
    if (!values) return label;

    // loop over provided values and replace those keys with their values in the provided label
    return Object.entries(values).reduce((newLabel, [key, value]) => {
        if (value === null) return newLabel;
        const regex = new RegExp(`{${key}}`, replaceAll ? "g" : "");
        return newLabel.replace(regex, `${value}`);
    }, label);
};

/**
 * Post data to an url and get return typed data
 * This url can  contain the method and the score:
 * GET;http://example.org?score={score} or POST;http://example.org
 */
export const fetchAnswerData = async <T extends Record<string, unknown>>(
    methodUrl: AnswerDataUrl,
    data: AnswerPostData,
): Promise<T | null> => {
    const splitUrl = methodUrl.split(";"); // gives array like ["GET", "http://url"] or ["http://url"]
    const url = replaceValues(splitUrl[splitUrl.length - 1], { score: data.score })!;
    const method = splitUrl.length > 1 ? splitUrl[0] : "GET";

    try {
        const request = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: method === "POST" ? JSON.stringify(data) : undefined,
        });
        return (await request.json()) as T;
    } catch (error) {
        console.error("Could not fetch answer data", error);
        return null;
    }
};

export const resetFormDispatcher = (dispatch: Dispatch<ActionsType>): void => {
    window.scrollTo({ top: 0 });
    dispatch(showResult(false));
    dispatch(resetAnswers());
    dispatch(updateRestartTimer(null));
};

// ----------------------------------------------------------------------
// State Selectors
// ----------------------------------------------------------------------

/**
 * Checks if a control should be disabled.
 */
export const disableControlsSelector = (state: StateType): boolean =>
    !state.config.result.enableControls && state.result.showResult;

/**
 * Returns a flat list of all questions in the config.
 */
export const getAllQuestionsSelector = (state: StateType): AllQuestionsType[] =>
    flattenQuestionGroups(state.config.groups);

/**
 * Returns the matching answer field for a question id, also takes care of type casting
 */
export const getQuestionAnswerSelector = <A extends AllAnswersType>(questionId: string) => (state: StateType): A =>
    (state.answers.list.find((answer) => answer.questionId === questionId) as A) || ({} as A);

// ----------------------------------------------------------------------
// Hooks
// ----------------------------------------------------------------------

/**
 * Returns true after the first render
 */
export const useAfterFirstRender = (): boolean => {
    const [value, setValue] = useState(false);
    useEffect(() => {
        setValue(true);
    }, []);
    return value;
};

// ----------------------------------------------------------------------
// Type helpers
// ----------------------------------------------------------------------

/**
 * Makes the all properties of a type and it's sub types Partial
 * Source: https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9#gistcomment-3300848
 */
export type DeepPartial<T> = T extends Function // eslint-disable-line @typescript-eslint/ban-types
    ? T
    : T extends object // eslint-disable-line @typescript-eslint/ban-types
    ? T extends unknown[]
        ? DeepPartial<T[number]>[]
        : { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

/**
 * This will spread the Omit util to all unioned types
 * Source: https://stackoverflow.com/a/57103940
 *
 * @example DistributiveOmit<A | B, "key"> = Omit<A, "key"> | Omit<B, "key">
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
