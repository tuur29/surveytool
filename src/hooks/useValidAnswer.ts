import { useState } from "react";
import { useStoreSelector } from "../redux/store";
import { AllQuestionsType, answerTypes, TextQuestionType } from "../types/ConfigTypes";
import { LabelType } from "../utils/labels";
import { isAnswerValid, isAnswerValueFilledIn } from "../utils/validator";
import useLabel from "./useLabel";

const textAnswerErrorLabelMap: Record<TextQuestionType["format"], LabelType> = {
    number: "inputTextErrorNumber",
    email: "inputTextErrorEmail",
    text: "inputTextErrorText",
};

const getErrorLabel = (question: AllQuestionsType): LabelType => {
    switch (question.type) {
        case answerTypes.single:
            return "inputSingleRequiredError";
        case answerTypes.multiple:
            return "inputMultipleRequiredError";
        case answerTypes.text:
            return textAnswerErrorLabelMap[question.format];
        case answerTypes.range:
            return "error"; // the slider component should prevent invalid values
    }
};

type DataType = {
    error: string;
    showError: boolean;
    setFocussed: () => void;
};

/**
 * Returns the matching answer field for a question id, also takes care of type casting
 */
const useValidAnswer = <Q extends AllQuestionsType>(question: Q): DataType => {
    // get answer value
    const answer = useStoreSelector((state) => state.answers.list.find((answer) => answer.questionId === question.id))!;

    // get correct error label
    const errorLabel = useLabel(getErrorLabel(question))!;
    const customErrorLabel = (question as TextQuestionType).customValidation?.error;

    // only show error when field has been touched or when loaded from storage
    const alreadyFocussed = useStoreSelector((state) => state.answers.loadedFromStorage);
    const filledIn = isAnswerValueFilledIn(answer);
    const valid = isAnswerValid(question, answer);
    const [focussed, setFocussed] = useState(alreadyFocussed);

    return {
        error: customErrorLabel || errorLabel,
        showError: (filledIn || !!question.required) && !valid && focussed,
        setFocussed: () => setFocussed(true),
    };
};

export default useValidAnswer;
