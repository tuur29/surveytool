import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import hash from "object-hash";
import {
    AllQuestionsType,
    MultipleChoiceQuestionType,
    QuestionGroup,
    questionTypes,
    RangeQuestionType,
    SingleChoiceQuestionType,
    TextQuestionType,
} from "../types/QuestionTypes";
import { AllAnswersType } from "../types/AnswerTypes";
import { AnswerPostData } from "../types/DataTypes";
import { AnswerDataUrl } from "../types/ResultTypes";
import { ActionsType, StateType } from "../redux/store";
import { resetAnswers, setAnswer, setAnswerFocus } from "../redux/actions/answersActions";
import { showResult, updateRestartTimer } from "../redux/actions/resultActions";
import Slider from "../components/common/Slider";
import RadioSlider from "../components/common/RadioSlider";
import { ValuesType } from "./labels";
import { hasTextAnswerForbiddenCharacter } from "./validator";

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

/**
 * Returns the correct format for the `answers.questionIdHash` field
 */
export const getQuestionIdHash = (question: AllQuestionsType): string => `${question.hash}-${question.id}`;

/**
 * Linked tot the element selector in ShowResultsButton.
 */
export const getQuestionScrollId = (question: AllQuestionsType): string => `question-${getQuestionIdHash(question)}`;

/**
 * Adds the hash field to a question.
 */
export const populateQuestionHash = <Q extends AllQuestionsType>(question: Q): Q => ({
    ...question,
    hash: hash(question),
});

/**
 * Create a new answer object based on a question.
 */
export const generateInitialAnswer = (question: AllQuestionsType): AllAnswersType => {
    const baseAnswer = { questionIdHash: getQuestionIdHash(question), focussed: false };
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
};

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
 * This url can contain the method and the score:
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
// Answer event handling
// ----------------------------------------------------------------------

export const onTextAnswerChange = (
    question: TextQuestionType,
    dispatch: Dispatch<ActionsType>,
    value: string,
): void => {
    // only block forbidden characters when no custom validation is applied, just to keep all options open
    if (!question.customValidation && hasTextAnswerForbiddenCharacter(question.inputType, value)) return;
    dispatch(
        setAnswer({
            questionIdHash: getQuestionIdHash(question),
            type: question.type,
            value: value,
        }),
    );
};

export const onSingleAnswerClick = (
    question: SingleChoiceQuestionType,
    dispatch: Dispatch<ActionsType>,
    value: boolean,
): void => {
    dispatch(setAnswerFocus(getQuestionIdHash(question), true));
    dispatch(
        setAnswer({
            questionIdHash: getQuestionIdHash(question),
            type: question.type,
            value,
        }),
    );
};

// TODO: could we define these defaults into the config
export const getRangeQuestionDefaultProps = (
    question: RangeQuestionType,
    dispatch: Dispatch<ActionsType>,
    value: number,
): React.ComponentProps<typeof Slider> | React.ComponentProps<typeof RadioSlider> => ({
    min: question.min || 0,
    max: question.max || 1,
    value: value || 0,
    step: question.step || 1,
    disabled: false,
    direction: question.direction || "increase",
    tickCount: question.tickCount,
    tickValues: question.tickValues,
    tickLabels: question.tickLabels,
    onChange: (value: number): void => {
        dispatch(
            setAnswer({
                questionIdHash: getQuestionIdHash(question),
                type: question.type,
                value,
            }),
        );
    },
});

export const onMultipleAnswerClick = (
    question: MultipleChoiceQuestionType,
    dispatch: Dispatch<ActionsType>,
    selectedIds: string[],
    newSelectedId: string,
): void => {
    let newValues: string[] = [];
    if (question.inputType === "radio") {
        newValues = selectedIds.includes(newSelectedId) ? ([] as string[]) : [newSelectedId];
    }

    if (question.inputType === "check") {
        newValues = selectedIds.includes(newSelectedId)
            ? selectedIds.filter((id) => id !== newSelectedId)
            : [...selectedIds, newSelectedId];
    }

    if (question.inputType === "select") {
        newValues = [newSelectedId];
    }

    dispatch(setAnswerFocus(getQuestionIdHash(question), true));
    dispatch(
        setAnswer({
            questionIdHash: getQuestionIdHash(question),
            type: question.type,
            values: newValues,
        }),
    );
};

// ----------------------------------------------------------------------
// State Selectors
// ----------------------------------------------------------------------

/**
 * Checks if the app is initialized
 */
export const getInitializedSelector = (state: StateType): boolean =>
    state.config.initialized && state.answers.initialized;

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
export const getQuestionAnswerSelector = <A extends AllAnswersType>(question: AllQuestionsType) => (
    state: StateType,
): A => (state.answers.list.find((answer) => answer.questionIdHash.includes(question.hash!)) as A) || ({} as A);

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
