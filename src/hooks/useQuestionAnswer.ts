import { AllAnswersType } from "../types/AnswerTypes";
import { useStore } from "../redux/store";

/**
 * Returns the matching answer field for a question id, also takes care of type casting
 */
const useQuestionAnswer = <A extends AllAnswersType>(questionId: string): A => {
    const matchingAnswer = useStore((state) => state.answers.list.find((answer) => answer.questionId === questionId));
    return matchingAnswer as A;
};

export default useQuestionAnswer;
