import { StoreType } from "../redux/store";
import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { setAnswerFocus } from "../redux/actions/answersActions";
import { getLabel } from "../hooks/useLabel";
import { LabelKeyType } from "./labels";
import { isAnswerValid } from "./validator";
import { getQuestionAnswerSelector } from "./utils";

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
const getValidAnswerData = <Q extends AllQuestionsType>(question: Q, store: StoreType): DataType => {
    // get answer value
    const { dispatch, getState } = store;
    const state = getState();
    const answer = getQuestionAnswerSelector(question.id)(state);

    // get correct error label
    const labels = state.config.labels;
    const errorLabel = getLabel(labels, getErrorLabel(question));

    const customErrorLabel = (question as TextQuestionType).customValidation?.error;
    const valid = isAnswerValid(question, answer);

    return {
        error: customErrorLabel || errorLabel || "Error",
        showError: !valid && answer.focussed,
        setFocussed: () => {
            dispatch(setAnswerFocus(answer.questionId, true));
        },
    };
};

export default getValidAnswerData;
