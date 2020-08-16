import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SeriesDataTypes } from "../../types/DataTypes";

type GraphInputType = {
    y: string; // label
    series: { name: string; values: (number | null)[] }[];
    xData: number[];
};

type PropsType = {
    data: SeriesDataTypes;
};

const LineGraph = (props: PropsType): JSX.Element => {
    const graphElement = useRef<SVGSVGElement>(null);
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };

    useEffect(() => {
        if (!graphElement.current) return;
        // Format data
        const data: GraphInputType = {
            y: "",
            series: props.data.series.map((item) => {
                return { ...item, values: props.data.values.map((point) => point[item.id] || null) };
            }),
            xData: props.data.values.map((item) => item.x),
        };

        // Setup chart
        const svg = d3.select(graphElement.current);

        // x axis
        const x = d3
            .scaleLinear()
            .domain([0, 10])
            .range([margin.left, width - margin.right]);
        const xAxis = (g: any) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0),
            );
        svg.append("g").call(xAxis);

        // y axis
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data.series, (d) => d3.max(d.values as any)) as any])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const yAxis = (g: any) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call((g: any) => g.select(".domain").remove())
                .call((g: any) =>
                    g
                        .select(".tick:last-of-type text")
                        .clone()
                        .attr("x", 3)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text(data.y),
                );
        svg.append("g").call(yAxis);

        // draw lines
        const line = d3.line()
            .defined((d: any) => !isNaN(d))
            .x((d, i): any => x(data.xData[i]))
            .y((d: any) => y(d));

            // svg.append("path")
            // .datum(data)
            // .attr("fill", "none")
            // .attr("stroke", "steelblue")
            // .attr("stroke-width", 1.5)
            // .attr("stroke-linejoin", "round")
            // .attr("stroke-linecap", "round")
            // .attr("d", line);

        const path = svg
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("path")
            .data(data.series)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("d", (d) => line(d.values as any));

        // svg.call(hover, path);
    }, [props.data, margin]);

    return <svg ref={graphElement} viewBox={`0, 0, ${width}, ${height}`} overflow="visible" />;
};

export default LineGraph;
