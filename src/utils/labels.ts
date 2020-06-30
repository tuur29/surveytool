export const defaultLabels = {
    dateLocaleId: "default", // used for formatting and translating dates / times, See (but replace _ with -) https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv
    questionsTitle: "Questions",
    questionsFooter: "Last update on {date}",
    inputSelectPlaceholder: "--- {count} options ---",
};

export type ValuesType = Partial<Record<"count" | "date", string | number>>;
export type LabelType = keyof typeof defaultLabels;
