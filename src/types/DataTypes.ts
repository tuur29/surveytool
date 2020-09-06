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
        highlight?: string | true; // overrides series colour
    } & Record<SeriesId, number | null>)[];
};
