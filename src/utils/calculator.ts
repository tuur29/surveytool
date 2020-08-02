import { AllQuestionsType, questionTypes, MultipleChoiceQuestionType, TextQuestionType } from "../types/QuestionTypes";
import {
    AllAnswersType,
    SingleChoiceAnswerType,
    MultipleChoiceAnswerType,
    RangeAnswerType,
    TextAnswerType,
} from "../types/AnswerTypes";

const calculateDefaultAnswerScore = (question: AllQuestionsType, answer: AllAnswersType): number => {
    switch (question.type) {
        case questionTypes.text: {
            const textAnswer = answer as TextAnswerType;
            const textQuestion = question as TextQuestionType;

            if (textQuestion.inputType === "number") return parseInt(textAnswer.value);
            return 0;
        }
        case questionTypes.single: {
            return (answer as SingleChoiceAnswerType).value ? 1 : 0;
        }
        case questionTypes.multiple: {
            const mcAnswer = answer as MultipleChoiceAnswerType;
            const mcQuestion = question as MultipleChoiceQuestionType;

            if (mcQuestion.inputType === "check") return mcAnswer.values.length;
            else return mcQuestion.options.findIndex((option) => option.id === mcAnswer.values[0]) + 1;
        }
        case questionTypes.range: {
            return (answer as RangeAnswerType).value;
        }
    }
};

export const calculateScore = (questions: AllQuestionsType[], answers: AllAnswersType[]): number => {
    return questions.reduce((total: number, question: AllQuestionsType, index: number) => {
        const answer = answers[index];

        if (question.calcFunction) {
            try {
                const score = Number.parseInt(question.calcFunction(question, answer) as any);
                if (Number.isNaN(score)) throw new Error("calcFunction does not return a number");

                return total + score;
            } catch (exception) {
                console.error(`Failed to calculate score of question ${question.id}`, exception);
            }
        }

        return total + calculateDefaultAnswerScore(question, answer);
    }, 0);
};
