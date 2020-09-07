import { AllAnswersType } from "./AnswerTypes";

type SeriesId = string;

export type SeriesDataTypes<T extends number | string | unknown = unknown> = {
    xLabel: number;
    yLabel: number;
    series: {
        id: SeriesId;
        name: string;
        color: string;
    }[];
    values: ({
        x: T;
    } & Record<SeriesId, number | null>)[];
};

// Data format to post answers to server, get graph data...
export type AnswerPostData = { score: number; answers: AllAnswersType[] };
