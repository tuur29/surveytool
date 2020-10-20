import { useState, useEffect } from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { AllAnswersType } from "../types/AnswerTypes";
import { AnswerPostData } from "../types/DataTypes";
import { AnswerDataUrl } from "../types/ResultTypes";
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
        console.error("Could not post answers", error);
        return null;
    }
};

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
 * @example DistributiveOmit<A | B> = Omit<A> | Omit<B>
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
