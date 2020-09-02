import { select, axisLeft, scaleLinear, scaleBand, axisBottom } from "d3";
import { SeriesDataTypes } from "../types/DataTypes";

export const drawBarGraph = (
    inputData: SeriesDataTypes<string>,
    element: SVGSVGElement,
    width: number,
    height: number,
    margin: { top: number; bottom: number; left: number; right: number },
): void => {

    // Setup chart
    const svg = select(element);
    svg.selectAll("*").remove();

    const graphWidth = width - margin.right; // 100% on x-axis
    const graphHeight = height - margin.bottom; // 0% on y-axis
    const categories = inputData.values.map((d) => d.x);
    const barPadding = 0.2;

    // x axis
    const xScale = scaleBand()
        .domain(categories)
        .range([margin.left, graphWidth])
        .padding(barPadding);

    // render x axis
    svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${graphHeight})`)
        .call(axisBottom(xScale));

    // y axis
    const [yMin, yMax] = inputData.values.reduce(
        (values, point) => {
            const { x, ...yValues } = point;
            const min = Math.min(values[0], ...(Object.values(yValues) as number[]));
            const max = Math.max(values[1], ...(Object.values(yValues) as number[]));
            return [min, max];
        },
        [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    );

    const yScale = scaleLinear()
        .domain([yMin, yMax])
        .range([graphHeight, margin.top])
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

    const group = svg.append("g").attr("class", "bargroup");

    inputData.values.forEach((point) => {
        const { x, ...yValues } = point;
        Object.entries(yValues).forEach(([id, value], index) => {
            const series = inputData.series.find((series) => series.id === id)!;

            const barWidth = xScale.bandwidth() / inputData.series.length;
            const xValue = xScale(x)! + barWidth * index;

            group
                .append("rect")
                .attr("class", `bar bar-${id}`)
                .attr("fill", series?.color)
                .attr("x", xValue)
                .attr("y", yScale(value!))
                .attr("width", barWidth)
                .attr("height", (graphHeight) - yScale(value!));
        });
    });

    // Add a vertical line
    svg.append("line")
        .attr("x1", xScale("cat4")! + xScale.bandwidth() / 2)
        .attr("y1", 0)
        .attr("x2", xScale("cat4")! + xScale.bandwidth() / 2)
        .attr("y2", height - margin.bottom)
        .style("stroke-width", 2)
        .style("stroke", "orange")
        .style("fill", "none");
};
