import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { AllAnswersType, TextAnswerType } from "../types/AnswerTypes";
import { getLabel } from "../hooks/useLabel";
import { setAnswerFocus } from "../redux/actions/answersActions";
import { StoreType } from "../redux/store";
import { LabelKeyType } from "./labels";
import { getQuestionAnswerSelector } from "./utils";

// eslint-disable-next-line
const REGEX_EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/; // https://emailregex.com/
const REGEX_NUMBER_ONLY = /^[0-9]*$/;

/**
 * Blocks the user from entering a character. Not to be confused with isTextAnswerValid.
 */
export const hasTextAnswerForbiddenCharacter = (format: TextQuestionType["inputType"], value: string): boolean => {
    switch (format) {
        case "number":
            return !value.match(REGEX_NUMBER_ONLY);
        case "email":
            return value.includes(" "); // no spaces allowed
        case "text":
            return false; // everything is allowed
    }
};

// ----------------------------------------------------------------------
// isAnswerValid
// ----------------------------------------------------------------------

const isAnswerValueFilledIn = (answer: AllAnswersType): boolean => {
    switch (answer.type) {
        case questionTypes.multiple: {
            return answer.values.length > 0;
        }
        case questionTypes.range: {
            return true;
        }
        case questionTypes.single: {
            return answer.value;
        }
        case questionTypes.text: {
            return !!answer.value;
        }
    }
};

const isTextAnswerValid = (question: TextQuestionType, answer: TextAnswerType): boolean => {
    // fail if answer is required but not filled in
    if (question.required && !isAnswerValueFilledIn(answer)) return false;

    // override with custom validation
    if (question.customValidation?.regex) {
        return !!answer.value.match(question.customValidation.regex);
    }

    switch (question.inputType) {
        case "number":
            return !!answer.value.match(REGEX_NUMBER_ONLY);
        case "email":
            return !!answer.value.match(REGEX_EMAIL_FORMAT);
        case "text":
            return true;
    }
};

export const isAnswerValid = (question: AllQuestionsType, answer: AllAnswersType): boolean => {
    // Because the hash isn't 100% collision proof we also check some other fields here, just in case.
    if (!question.hash || !answer.questionIdHash.includes(question.hash) || question.type !== answer.type) {
        throw new Error(
            `Cannot validate answer with data from a different question. Question hash: ${question.hash}, answers question idHash: ${answer.questionIdHash}`,
        );
    }

    // validate text answers
    if (question.type === questionTypes.text && answer.type === questionTypes.text) {
        return isTextAnswerValid(question, answer);
    }

    // fail if answer is required but not filled in
    if (question.required && !isAnswerValueFilledIn(answer)) return false;

    // singleChoice, multipleChoice and range question types cannot be filled in with invalid values
    return true;
};

// ----------------------------------------------------------------------
// getValidAnswerData
// ----------------------------------------------------------------------

const textAnswerErrorLabelMap: Record<TextQuestionType["inputType"], LabelKeyType> = {
    number: "inputTextErrorNumber",
    email: "inputTextErrorEmail",
    text: "inputTextErrorText",
};

const getErrorLabel = (question: AllQuestionsType): LabelKeyType => {
    switch (question.type) {
        case questionTypes.single:
            return "inputSingleRequiredError";
        case questionTypes.multiple:
            return "inputMultipleRequiredError";
        case questionTypes.text:
            return textAnswerErrorLabelMap[question.inputType];
        case questionTypes.range:
            return "" as LabelKeyType; // the slider component should prevent invalid values
    }
};

type DataType = {
    error: string;
    showError: boolean;
    setFocussed: () => void;
};

/**
 * Returns the matching answer field for a question id, also takes care of type casting.
 * (!) Attention, because of it's direct store usage, it will not trigger a re-render on it's own when used in a React component!
 */
export const getValidAnswerData = <Q extends AllQuestionsType>(question: Q, store: StoreType): DataType => {
    // get answer value
    const { dispatch, getState } = store;
    const state = getState();
    const answer = getQuestionAnswerSelector(question)(state);

    // get correct error label
    const labels = state.config.labels;
    const errorLabel = getLabel(labels, getErrorLabel(question));

    const customErrorLabel = (question as TextQuestionType).customValidation?.error;
    console.log("\x1b[36mLog%s: %o\x1b[0m", ": question, answer", question, answer);
    const valid = isAnswerValid(question, answer);

    return {
        error: customErrorLabel || errorLabel || "Error",
        showError: !valid && answer.focussed,
        setFocussed: () => {
            dispatch(setAnswerFocus(answer.questionIdHash, true));
        },
    };
};
