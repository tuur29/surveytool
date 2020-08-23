import { select, extent, min, max, axisLeft, scaleLinear, axisBottom, line } from "d3";
import { SeriesDataTypes } from "../types/DataTypes";

type LineSeriesType = {
    id: string;
    name: string;
    color: string;
    x: number[];
    y: number[];
};

export const drawLineGraph = (
    inputData: SeriesDataTypes<number>,
    element: SVGSVGElement,
    width: number,
    height: number,
    margin: { top: number; bottom: number; left: number; right: number },
    tickSpread: number,
): void => {
    const sortedValues = inputData.values.sort((a, b) => a.x - b.x);

    // Format data
    const data: LineSeriesType[] = inputData.series.map((item) => {
        const filteredValues = sortedValues.reduce<
            {
                x: number;
                y: number;
            }[]
        >((list, point) => {
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

    // Setup chart
    const svg = select(element);
    svg.selectAll("*").remove();

    // x axis
    const [xMin, xMax] = extent(sortedValues, (d) => d.x);
    const xScale = scaleLinear()
        .domain([xMin || 0, xMax || 0])
        .range([margin.left, width - margin.right]);

    // render x axis
    svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
            axisBottom(xScale)
                .ticks(width / tickSpread)
                .tickSizeOuter(0),
        );

    // y axis
    const yMin = min(data, (series) => min(series.y)) || 0;
    const yMax = max(data, (series) => max(series.y)) || 0;
    const yScale = scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin.bottom, margin.top])
        .nice();

    // render y axis
    svg.append("g")
        .attr("class", "axis-y")
        .attr("transform", `translate(${margin.left},0)`)
        .call(axisLeft(yScale))
        .call((group) =>
            group // render y axis label
                .select(".tick:last-of-type text")
                .clone()
                .attr("x", 6)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(inputData.yLabel),
        );

    // draw a single series line
    const drawLine = (series: LineSeriesType): string | null => {
        const lineFunc = line<any>()
            .x((x) => xScale(x))
            .y((_, index) => yScale(series.y[index]));

        return lineFunc(series.x);
    };

    // create a group for all lines
    const lineGroup = svg
        .append("g")
        .attr("class", "linegroup")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

    // draw all lines
    lineGroup
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("stroke", (series) => series.color)
        .attr("d", drawLine);

    // TODO: add hover effect
    // svg.call(hover, path);
};
