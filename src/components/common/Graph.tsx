/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import { SeriesDataTypes } from "../../types/DataTypes";
import { drawLineGraph } from "../../utils/lineGraph";
import { ResultGraphType } from "../../types/ResultTypes";
import { drawBarGraph } from "../../utils/barGraph";

type PropsType = {
    type: ResultGraphType["format"];
    data: SeriesDataTypes;
};

const Graph = (props: PropsType): JSX.Element => {
    const graphElement = useRef<SVGSVGElement>(null);
    const width = 600;
    const height = 300;

    useEffect(() => {
        const margin = { top: 20, right: 20, bottom: 30, left: 30 };
        const tickSpread = 80;

        if (!graphElement.current) return;
        switch (props.type) {
            case "line":
                drawLineGraph(
                    props.data as SeriesDataTypes<number>,
                    graphElement.current,
                    width,
                    height,
                    margin,
                    tickSpread,
                );
                break;
            case "bar":
                drawBarGraph(props.data as SeriesDataTypes<string>, graphElement.current, width, height, margin);
                break;
        }
    }, [props.data, props.type]);

    return <svg ref={graphElement} viewBox={`0, 0, ${width}, ${height}`} overflow="visible" />;
};

// A quick way to get the doc-gen function of Storybook working correctly
export const GraphDoc = (props: SeriesDataTypes & Omit<PropsType, "data">): null => props && null;

export default Graph;
