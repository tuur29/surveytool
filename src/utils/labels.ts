export const defaultLabels = {
    // general
    dateLocaleId: "default", // used for formatting and translating dates / times, See (but replace _ with -) https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv
    error: "Error",

    // questions
    questionsTitle: "Questions",
    questionsFooter: "Last update on {date}",
    questionsErrorTitle: "These questions need to be filled in correctly to see your result:",
    inputSelectPlaceholder: "--- {count} options ---",
    inputTextErrorNumber: "Please provide a valid number",
    inputTextErrorEmail: "Please provide a correctly formatted email address",
    inputTextErrorText: "Wrong format",
    inputSingleRequiredError: "This field is required",
    inputMultipleRequiredError: "Please select an option",

    // results
    resultTitle: "Result",
    resultSeeButton: "See results",
};

export type ValuesType = Partial<Record<"count" | "date" | "score", string | number>>;
export type LabelType = keyof typeof defaultLabels;
