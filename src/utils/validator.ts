import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { AllAnswersType, TextAnswerType } from "../types/AnswerTypes";

// eslint-disable-next-line
export const REGEX_EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // https://emailregex.com/
export const REGEX_NUMBER_ONLY = /^[0-9]*$/;

export const isAnswerValueFilledIn = (answer: AllAnswersType): boolean => {
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
    if (question.type === questionTypes.text && answer.type === questionTypes.text) {        
        return isTextAnswerValid(question, answer);
    }

    // fail if answer is required but not filled in
    if (question.required && !isAnswerValueFilledIn(answer)) return false;

    // singleChoice, multipleChoice and range question types cannot be filled in with invalid values
    return true;
};
