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

type Answer = string | Required<Hintable>;

type BaseQuestion = {
    id: string;
    title: string;
    ignoredInScore?: true;
    // TODO: weights?
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.single;
};

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: answerTypes.multiple;
    answers: Answer[];
    inputType: "radio" | "check" | "select";
};

// example: email, age
export type TextQuestionType = Answer & {
    type: answerTypes.text;
    placeholder?: string;
    format: "text" | "email" | "number";
};

// example: ratings
export type SliderQuestionType = BaseQuestion & {
    type: answerTypes.slider;
    min: number;
    max: number;
};
