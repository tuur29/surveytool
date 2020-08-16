/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SeriesDataTypes } from "../../types/DataTypes";

type GraphSeriesType = {
    id: string;
    name: string;
    color: string;
    x: number[];
    y: number[];
};

type GraphPointType = {
    x: number;
    y: number;
};

type PropsType = {
    data: SeriesDataTypes;
};

const LineGraph = (props: PropsType): JSX.Element => {
    const graphElement = useRef<SVGSVGElement>(null);
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const tickSpread = 80;

    useEffect(() => {
        if (!graphElement.current) return;

        const sortedValues = props.data.values.sort((a, b) => a.x - b.x);

        // Format data
        const data: GraphSeriesType[] = props.data.series.map((item) => {
            const filteredValues = sortedValues.reduce<GraphPointType[]>((list, point, index) => {
                if (point[item.id]) {
                    list.push({
                        x: point.x,
                        y: point[item.id] as number,
                    });
                }
                return list;
            }, []);

            return {
                ...item,
                x: filteredValues.map((point) => point.x),
                y: filteredValues.map((point) => point.y),
            };
        });

        // setup chart
        const svg = d3.select(graphElement.current);
        svg.selectAll("*").remove();

        // x axis
        const xMin = d3.min(sortedValues.map((point) => point.x)) || 0;
        const xMax = d3.max(sortedValues.map((point) => point.x)) || 0;
        const xScale = d3
            .scaleLinear()
            .domain([xMin, xMax])
            .range([margin.left, width - margin.right]);

        svg.append("g").call((g) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3
                    .axisBottom(xScale)
                    .ticks(width / tickSpread)
                    .tickSizeOuter(0),
            ),
        );

        // y axis
        const yMin = d3.min(data, (series) => d3.min(series.y)) || 0;
        const yMax = d3.max(data, (series) => d3.max(series.y)) || 0;
        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g").call((g) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g
                        .select(".tick:last-of-type text")
                        .clone()
                        .attr("x", 3)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text(props.data.yLabel),
                ),
        );

        // draw a single series line
        const drawLine = (series: GraphSeriesType): string | null => {
            const pointArray: [number, number][] = series.x.map((x, i) => [x, series.y[i]]);
            return d3
                .line()
                .x((d) => xScale(d[0]))
                .y((d) => yScale(d[1]))(pointArray);
        };

        // draw all series lines
        svg.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("path")
            .data(data)
            .join("path")
            .attr("stroke", (series) => series.color)
            .attr("d", (series) => drawLine(series));

        // TODO: add hover effect
        // svg.call(hover, path);
    }, [props.data, margin]);

    return <svg ref={graphElement} viewBox={`0, 0, ${width}, ${height}`} overflow="visible" />;
};

export default LineGraph;
