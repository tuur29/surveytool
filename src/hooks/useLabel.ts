import { useStoreSelector } from "../redux/store";
import { ValuesType, LabelType, defaultLabels } from "../utils/labels";

const replaceValues = (label: string | null, values?: ValuesType): string | null => {
    if (!label) return null;
    if (!values) return label;

    return Object.entries(values).reduce((newLabel, valueEntry) => {
        const regex = new RegExp(`{${valueEntry[0]}}`, "g");
        return newLabel.replace(regex, `${valueEntry[1]}`);
    }, label);
};

/**
 * Accepts either a single label key, optionally a value map can be provided that will replace {placeholders} inside a defined label with the provided value
 * Returns the user configured translation of a label, it's default or null if the label is optional.
 *
 * @example useLabel("scoreTitle", { score: 95 }); + "Congrats with your {score}% score!" => "Congrats with your 95% score!"
 * */
export const useLabel = (query: LabelType, values?: ValuesType): string | null => {
    const labels = useStoreSelector((state) => state.config.labels);
    return replaceValues(labels[query] || defaultLabels[query] || null, values);
};

/**
 * Similar to useLabel, but accepts an array and returns an array
 */
export const useLabels = (query: LabelType[], values?: ValuesType): (string | null)[] => {
    const labels = useStoreSelector((state) => state.config.labels);

    return query.map((labelKey) => replaceValues(labels[labelKey] || defaultLabels[labelKey] || null, values));
};

export default useLabel;
