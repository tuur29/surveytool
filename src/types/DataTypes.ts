import { graphHighlightId } from "../utils/utils";
import { AllAnswersType } from "./AnswerTypes";

type SeriesId = string;

export type SeriesDataTypes<T extends number | string | unknown = unknown> = {
    // T depends on line or bar chart
    xLabel: number;
    yLabel: number;
    series: {
        id: SeriesId;
        name: string;
        color: string;
    }[];
    values: ({
        x: T;
        [graphHighlightId]?: string | true; // overrides series color
    } & Record<SeriesId, number | null>)[];
};

// Data format to post answers to server, get graph data...
export type AnswerPostData = { configId: string; score: number; answers: AllAnswersType[] };
