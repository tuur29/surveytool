import { AllAnswersType } from "./AnswerTypes";

export enum questionTypes {
    single = "single",
    multiple = "multiple",
    text = "text",
    range = "range",
}

type Hintable = {
    title: string;
    /** Each usage of the `{hint}` placeholder needs to have a string in this array. Optional if no hints are used. */
    hints?: string[];
};

export type ImageType = {
    url: string;
    /** Optional, "left" is not supported in questions */
    alignment?: "left" | "center" | "right";
    /** Decimal between 0 and 1, represents total width of parent */
    size?: number;
    /** Text that will be shown in case the image cannot be loaded, also useful for accessibility */
    alt?: string;
};

export type BaseQuestion = {
    /** Can be used for easy identification in calcFunction and while debugging. */
    id?: string;
    /**
     * Created by application to identify the question. This links the question to it's answer.
     * It is always set, but because we are using the same input as output typing it is defined as optional.
     * @internal
     */
    hash?: string;
    /** The question being asked to the user. This string can contain multiple `{hint}` placeholders. */
    title: string;
    /** Required questions need to be filled in by the user before they can submit their answers. */
    required?: boolean;
    /** Optional function that can be used to override the default score calculations. */
    calcFunction?: (question: AllQuestionsType, answer: AllAnswersType) => number | undefined;
    /** Will be displayed above or to the right of the question title. */
    image?: ImageType;
} & Hintable;

// example: "I agree with terms and conditions"
export type SingleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.single;
    /** Causes the checkbox to already be checked when the user first loads the form. */
    checkedByDefault?: boolean;
};

type Options = {
    id: string;
} & Hintable;

// example: country, gender
export type MultipleChoiceQuestionType = BaseQuestion & {
    type: questionTypes.multiple;
    /** Will display the options with radio buttons (single answer), checkboxes or in a dropdown (multiple answers) */
    inputType: "radio" | "check" | "select";
    /** A required list of possible values. These are objects containing an id, title and optional hints array */
    options: Options[];
    /** Optional. When filled with id's matching an option, those options will already be selected when the user first loads the form. */
    defaultIds?: string[]; // this should be the ids of the default selected options
};

// example: email, age
export type TextQuestionType = BaseQuestion & {
    type: questionTypes.text;
    /** Will validate and limit the user's input. */
    inputType: "text" | "email" | "number";
    /** Optional. Will be shown inside the input field when the user hasn't entered a value. */
    placeholder?: string;
    /** Optional, can contain a custom `error` message (string) and/or a custom `regex` expression (string) for validation. */
    customValidation?: {
        /** String without regex boundaries. Example: "^.{0,10}$" */
        regex?: string;
        /** Overrides default error message */
        error?: string;
    };
};

export type RangeDirectionType = "increase" | "decrease"; // increase is default

// example: ratings
export type RangeQuestionType = BaseQuestion & {
    type: questionTypes.range;
    /** Functionally these work the same, only the visual input method differs. "slider" has more options (ticks). */
    inputType: "slider" | "radio";
    /** Minimum value */
    min: number;
    /** Maximum value */
    max: number;
    /** Optional. The default value when the user first opens the form. */
    default?: number;
    /** Optional. The size of each step between slider positions / radio buttons. For example: setting this to 2 will only allow (un)even numbers. */
    step?: number;
    /** Optional, defaults to "increase". Setting this to decrease will default to and put the maximum first. */
    direction?: RangeDirectionType;
    /** Only used on slider, optional. Will spread out this amount of ticks on the slider. */
    tickCount?: number;
    /** Only used on slider, optional. When set, the ticks will be displayed at these exact values. Will override the `tickCount` setting. */
    tickValues?: number[];
    /** Only used on slider, optional. When set, will override the tick labels (normally just the value). Use `null` to keep a tick label empty. */
    tickLabels?: (string | null)[];
};

export type AllQuestionsType =
    | SingleChoiceQuestionType
    | MultipleChoiceQuestionType
    | TextQuestionType
    | RangeQuestionType;

export type QuestionGroup = {
    title?: string;
    /** Can contain HTML */
    description?: string;
    /** Will be displayed above or to the right of the question title. */
    image?: ImageType;
    /** When filled in a left border will be shown in the CSS hex colour */
    accentColor?: string;
    /** Colours the question wrappers in this CSS hex colour */
    backgroundColor?: string;
    questions: AllQuestionsType[];
    /** Displays all questions/inputs in a compact table view */
    tabledView?: boolean;
    /** Headings above the input column */
    tableInputHeadings?: string[];
    // showOnNewPage?: boolean; // TODO: Allow pagination via groups
};
