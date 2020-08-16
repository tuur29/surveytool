
type SeriesId = string;

export type SeriesDataTypes = {
    xLabel: number;
    yLabel: number;
    series: ({
        id: SeriesId;
        name: string;
        color: string;
    })[];
    values: ({
        x: number;
    } & Record<SeriesId, number | null>)[];
};
