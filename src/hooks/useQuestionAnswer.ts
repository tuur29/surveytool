import { AllAnswersType } from "../types/AnswerTypes";
import { useStoreSelector } from "../redux/store";

// TODO: this should be refactored to a util selector
/**
 * Returns the matching answer field for a question id, also takes care of type casting
 */
const useQuestionAnswer = <A extends AllAnswersType>(questionId: string): A => {
    const matchingAnswer = useStoreSelector((state) =>
        state.answers.list.find((answer) => answer.questionId === questionId),
    );
    return matchingAnswer as A;
};

export default useQuestionAnswer;
