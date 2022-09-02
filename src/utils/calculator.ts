import { AllQuestionsType, questionTypes, MultipleChoiceQuestionType, TextQuestionType } from "../types/QuestionTypes";
import {
    AllAnswersType,
    SingleChoiceAnswerType,
    MultipleChoiceAnswerType,
    RangeAnswerType,
    TextAnswerType,
} from "../types/AnswerTypes";
import { ScoreType } from "../types/CommonTypes";
import { ConfigType } from "../types/ConfigTypes";
import { getQuestionIdHash } from "./utils";

const calculateDefaultAnswerScore = (question: AllQuestionsType, answer: AllAnswersType): number => {
    switch (question.type) {
        case questionTypes.text: {
            const textAnswer = answer as TextAnswerType;
            const textQuestion = question as TextQuestionType;

            if (textQuestion.inputType === "number") return parseFloat(textAnswer.value) || 0;
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

export const calculateScore = (
    questions: AllQuestionsType[],
    answers: AllAnswersType[],
    config: ConfigType,
): ScoreType => {
    const firstKey = config.result.scoreTypes[0];
    const defaultScoreObject = config.result.scoreTypes.reduce(
        (scoreObj, key) => ({ [key]: 0, ...scoreObj }),
        {} as ScoreType,
    );
    return questions.reduce((total: ScoreType, question: AllQuestionsType, index: number) => {
        const answer = answers[index];

        if (question.calcFunction) {
            try {
                const customScore = question.calcFunction(question, answer, answers);
                const scoreObject = typeof customScore !== "object" ? { [firstKey]: customScore } : customScore;

                return Object.entries(scoreObject).reduce((prevTotal, [key, score]) => {
                    const parsedScore = parseFloat((score as unknown) as string);
                    if (Number.isNaN(parsedScore)) throw new Error("calcFunction does not return a number");
                    return { ...prevTotal, [key]: prevTotal[key] + parsedScore };
                }, total);
            } catch (exception) {
                console.error(`Failed to calculate score of question ${getQuestionIdHash(question)}`, exception);
            }
        }

        return { ...total, [firstKey]: total[firstKey] + calculateDefaultAnswerScore(question, answer) };
    }, defaultScoreObject);
};
