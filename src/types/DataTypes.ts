import { AllAnswersType } from "./AnswerTypes";
import { graphHighlightId } from "../utils/utils";

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
        [graphHighlightId]?: string | true; // overrides series colour
    } & Record<SeriesId, number | null>)[];
};

// Data format to post answers to server, get graph data...
export type AnswerPostData = { score: number; answers: AllAnswersType[] };
