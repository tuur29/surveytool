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

type PossibleAnswer = string | Required<Hintable>;

type BaseQuestion = {
    id: string;
    title: string;
    ignoredInScore?: true;
    // TODO: weights?
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
    inputType: "radio" | "check" | "select";
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
