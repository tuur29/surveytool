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
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const tickSpread = 80;

    useEffect(() => {
        if (!graphElement.current) return;
        // drawLineGraph(props.data as SeriesDataTypes<number>, graphElement.current, width, height, margin, tickSpread);
        drawBarGraph(props.data as SeriesDataTypes<string>, graphElement.current, width, height, margin);
    }, [props.data, margin]);

    return <svg ref={graphElement} viewBox={`0, 0, ${width}, ${height}`} overflow="visible" />;
};

export default Graph;
