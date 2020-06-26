export enum answerTypes {
    single = "singleChoice",
    multiple = "multipleChoice",
    text = "text",
    slider = "slider",
}

type Hintable = {
    title: string;
    hints?: string[]; // %h placeholder in title is replaced with indexed hint
};

type PossibleAnswer = {
    id: string;
} & Hintable;

type BaseQuestion = {
    id: string;
    title: string;
    // TODO: weights?
    // TODO: required answer
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.single;
    checkedByDefault?: boolean;
};

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.multiple;
    answers: PossibleAnswer[];
    inputType: "radio" | "select" | "check";
    calcFunction?: (question: MultipleChoiceQuestionType, answerIds: string[], answerValues: string[], answerIndex: number[]) => number | undefined;
};

// example: email, age
export type TextQuestionType = BaseQuestion & {
    type: answerTypes.text;
    placeholder?: string;
    format: "text" | "email" | "number";
    // TODO: add rows option?
};

// example: ratings
export type SliderQuestionType = BaseQuestion & {
    type: answerTypes.slider;
    min: number;
    max: number;
};

export type AllQuestionsType = SingleChoiceQuestionType | MultipleChoiceQuestionType | TextQuestionType | SliderQuestionType;

export type ConfigType = {
    questions: AllQuestionsType[];
};
