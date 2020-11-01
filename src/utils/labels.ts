export const generalLabels = {
    /** Used for formatting and translating dates / times, See (but replace _ with -) https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv */
    dateLocaleId: "default",
    /** Displayed in the bottom right corner, can contain timestamp of when the user last made a change */
    footerText: "Last update on {date}",
};

export const messageLabels = {
    /** Generic error message in case something really bad breaks */
    messageErrorTitle: "Error",
    /** Button to dismiss all in case multiple notifications / messages are shown */
    messageDismissAll: "Dismiss all",
    /** Shown when config could not be initialized */
    messageInitError: "The tool could not be initialized properly.",
    /** Shown when a graph could not be loaded */
    messageGraphDataError: "Oops, could not display graph.",
};

export const questionLabels = {
    /** Optional title above the list of questions */
    questionsTitle: "Questions",
    /** Optional description above the list of questions */
    questionsDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris.\nEquidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus.",
    /** Will be shown below the list of questions to announce which questions still need to be filled in */
    questionsErrorTitle: "These questions need to be filled in correctly to see your result:",
    /** The placeholder text on a Multiple Choice select / dropdown input, can countain a {count} placeholder for the amount of options the question has */
    inputSelectPlaceholder: "--- {count} options ---",
    /** Error message shown below a text input (inputType=number) when the input is invalid */
    inputTextErrorNumber: "Please provide a valid number",
    /** Error message shown below a text input (inputType=email) when the input is invalid */
    inputTextErrorEmail: "Please provide a correctly formatted email address",
    /** Error message shown below a text input (inputType=text) when the input is invalid, should probably be overwritten with customValidation.error */
    inputTextErrorText: "Wrong format",
    /** Error message shown below a required Single Choice question (checkbox) */
    inputSingleRequiredError: "This field is required",
    /** Error message shown below a required Multiple Choice question */
    inputMultipleRequiredError: "Please select an option",
};

export const resultLabels = {
    /** Optional title shown above results page */
    resultTitle: "Result",
    /** Button below the questions list to submit your answers / view your results */
    resultSeeButton: "See results",
};

export const defaultLabels = {
    ...generalLabels,
    ...messageLabels,
    ...questionLabels,
    ...resultLabels,
};

export type ValuesType = Partial<Record<"count" | "date" | "score", string | number>>;
export type LabelType = keyof typeof defaultLabels;
