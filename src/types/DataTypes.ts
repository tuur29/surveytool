import { graphHighlightId } from "../utils/utils";
import { AllAnswersType } from "./AnswerTypes";

type SeriesId = string;

/** Typescript doesn't seem to support this strict typing so I added the supported types in comment */
type ValueType<T extends number | string | unknown = unknown> = {
    x: T;
    /** Overrides series color when a string is provided */
    [graphHighlightId]?: string | true;
    /** key should be SeriesId, only `number` is actually supported  */
    [key: string]: T | number | string | true | undefined;
};

export type SeriesDataTypes<T extends number | string | unknown = unknown> = {
    /** Text displayed at the end of the x-axis */
    xLabel: string;
    /** Text displayed at the end of the y-axis */
    yLabel: string;
    /** List of y-values for each line / bar-group (linked by id value). Use id "highlight" when using highlights. */
    series: {
        id: SeriesId;
        name: string;
        color: string;
    }[];
    /** List of every data point each needs to have a x-value and one or more series values. */
    values: ValueType<T>[];
};

// Data format to post answers to server, get graph data...
export type AnswerPostData = { configId: string; score: number; answers: AllAnswersType[] };
