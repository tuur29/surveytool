export const defaultLabels = {
    // general
    dateLocaleId: "default", // used for formatting and translating dates / times, See (but replace _ with -) https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv
    footerText: "Last update on {date}", // displayed in the bottom right corner, can contain timestamp of when the user last made a change

    // messages
    messageErrorTitle: "Error", // generic error message in case something really bad breaks
    messageDismissAll: "Dismiss all", // button to dismiss all in case multiple notifications / messages are shown
    messageInitError: "The tool could not be initialized properly.", // shown when config could not be initialized

    // questions
    questionsTitle: "Questions", // optional title above the list of questions
    questionsDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris.\nEquidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus.", // optional description above the list of questions
    questionsErrorTitle: "These questions need to be filled in correctly to see your result:", // will be shown below the list of questions to announce which questions still need to be filled in
    inputSelectPlaceholder: "--- {count} options ---", // the placeholder text on a Multiple Choice select / dropdown input, can countain a {count} placeholder for the amount of options the question has
    inputTextErrorNumber: "Please provide a valid number", // error message shown below a text input (inputType=number) when the input is invalid
    inputTextErrorEmail: "Please provide a correctly formatted email address", // error message shown below a text input (inputType=email) when the input is invalid
    inputTextErrorText: "Wrong format", // error message shown below a text input (inputType=text) when the input is invalid, should probably be overwritten with customValidation.error
    inputSingleRequiredError: "This field is required", // error message shown below a required Single Choice question (checkbox)
    inputMultipleRequiredError: "Please select an option", // error message shown below a required Multiple Choice question

    // results
    resultTitle: "Result", // optional title shown above results page
    resultSeeButton: "See results", // button below the questions list to submit your answers / view your results
};

export type ValuesType = Partial<Record<"count" | "date" | "score", string | number>>;
export type LabelType = keyof typeof defaultLabels;
