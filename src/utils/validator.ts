import { AllQuestionsType, answerTypes, TextQuestionType } from "../types/ConfigTypes";
import { AllAnswersType, TextAnswerType } from "../types/AnswerTypes";

// eslint-disable-next-line
export const REGEX_EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // https://emailregex.com/
export const REGEX_NUMBER_ONLY = /^[0-9]*$/;

export const isAnswerValueFilledIn = (answer: AllAnswersType): boolean => {
    switch (answer.type) {
        case answerTypes.multiple: {
            return answer.values.length > 0;
        }
        case answerTypes.range: {
            return true;
        }
        case answerTypes.single: {
            return answer.value;
        }
        case answerTypes.text: {
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

    switch (question.format) {
        case "number":
            return !!answer.value.match(REGEX_NUMBER_ONLY);
        case "email":
            return !!answer.value.match(REGEX_EMAIL_FORMAT);
        case "text":
            return true;
    }
};

export const isAnswerValid = (question: AllQuestionsType, answer: AllAnswersType): boolean => {
    if (question.type !== answer.type || question.id !== answer.questionId) {
        throw new Error(
            `Cannot validate answer with data from a different question. Question id: ${question.id}, answers question id: ${answer.questionId}`,
        );
    }

    // validate text answers
    if (question.type === answerTypes.text && answer.type === answerTypes.text) {        
        return isTextAnswerValid(question, answer);
    }

    // fail if answer is required but not filled in
    if (question.required && !isAnswerValueFilledIn(answer)) return false;

    // singleChoice, multipleChoice and range question types cannot be filled in with invalid values
    return true;
};
