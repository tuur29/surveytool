import { useState } from "react";
import { useStoreSelector } from "../redux/store";
import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { LabelType } from "../utils/labels";
import { isAnswerValid } from "../utils/validator";
import useLabel from "./useLabel";
import useQuestionAnswer from "./useQuestionAnswer";

const textAnswerErrorLabelMap: Record<TextQuestionType["format"], LabelType> = {
    number: "inputTextErrorNumber",
    email: "inputTextErrorEmail",
    text: "inputTextErrorText",
};

const getErrorLabel = (question: AllQuestionsType): LabelType => {
    switch (question.type) {
        case questionTypes.single:
            return "inputSingleRequiredError";
        case questionTypes.multiple:
            return "inputMultipleRequiredError";
        case questionTypes.text:
            return textAnswerErrorLabelMap[question.format];
        case questionTypes.range:
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
    const answer = useQuestionAnswer(question.id);

    // get correct error label
    const errorLabel = useLabel(getErrorLabel(question))!;
    const customErrorLabel = (question as TextQuestionType).customValidation?.error;

    // only show error when field has been touched or when loaded from storage
    const alreadyFocussed = useStoreSelector((state) => state.answers.loadedFromStorage);
    const valid = isAnswerValid(question, answer);
    const [focussed, setFocussed] = useState(alreadyFocussed);

    return {
        error: customErrorLabel || errorLabel,
        showError: !valid && focussed,
        setFocussed: () => setFocussed(true),
    };
};

export default useValidAnswer;
