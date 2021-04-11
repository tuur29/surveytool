import { AllQuestionsType, questionTypes, TextQuestionType } from "../types/QuestionTypes";
import { AllAnswersType, TextAnswerType } from "../types/AnswerTypes";

// eslint-disable-next-line
export const REGEX_EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // https://emailregex.com/
export const REGEX_NUMBER_ONLY = /^[0-9]*$/;

const isAnswerValueFilledIn = (answer: AllAnswersType): boolean => {
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

    switch (question.inputType) {
        case "number":
            return !!answer.value.match(REGEX_NUMBER_ONLY);
        case "email":
            return !!answer.value.match(REGEX_EMAIL_FORMAT);
        case "text":
            return true;
    }
};

export const isAnswerValid = (question: AllQuestionsType, answer: AllAnswersType): boolean => {
    // Because the hash isn't 100% collision proof we also check some other fields here, just in case.
    if (!answer.questionIdHash.includes(question.hash!) || question.type !== answer.type) {
        throw new Error(
            `Cannot validate answer with data from a different question. Question hash: ${question.hash}, answers question idHash: ${answer.questionIdHash}`,
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
