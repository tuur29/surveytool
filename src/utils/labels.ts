export const defaultLabels = {
    questionsTitle: "Questions",
    inputSelectPlaceholder: "--- {count} options ---",
};

export type ValuesType = Record<"count", string | number>;
export type LabelType = keyof typeof defaultLabels;
