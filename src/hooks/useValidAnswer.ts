import { useStoreDispatch } from "../redux/store";
import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { LabelType } from "../utils/labels";
import { isAnswerValid } from "../utils/validator";
import { setAnswerFocus } from "../redux/actions/answersActions";
import useLabel from "./useLabel";
import useQuestionAnswer from "./useQuestionAnswer";

const textAnswerErrorLabelMap: Record<TextQuestionType["inputType"], LabelType> = {
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
            return textAnswerErrorLabelMap[question.inputType];
        case questionTypes.range:
            return "" as LabelType; // the slider component should prevent invalid values
    }
};

type DataType = {
    error: string;
    showError: boolean;
    setFocussed: () => void;
};

// TODO: refactor this to a util selector
/**
 * Returns the matching answer field for a question id, also takes care of type casting
 */
const useValidAnswer = <Q extends AllQuestionsType>(question: Q): DataType => {
    // get answer value
    const dispatch = useStoreDispatch();
    const answer = useQuestionAnswer(question.id);

    // get correct error label
    const errorLabel = useLabel(getErrorLabel(question))!;
    const customErrorLabel = (question as TextQuestionType).customValidation?.error;
    const valid = isAnswerValid(question, answer);

    return {
        error: customErrorLabel || errorLabel,
        showError: !valid && answer.focussed,
        setFocussed: () => {
            dispatch(setAnswerFocus(answer.questionId, true));
        },
    };
};

export default useValidAnswer;
