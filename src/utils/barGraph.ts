import { select, axisLeft, scaleLinear, scaleBand, axisBottom } from "d3";
import { SeriesDataTypes } from "../types/DataTypes";
import { graphHighlightId } from "./utils";

type HighlightType = { category: string; color: string };

// prettier-ignore
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
    svg.append("g").attr("class", "axis-x").attr("transform", `translate(0,${graphHeight})`).call(axisBottom(xScale));

    // y axis
    const [yMin, yMax] = inputData.values.reduce(
        (values, point) => {
            const { x, highlight, ...yValues } = point;
            const min = Math.min(values[0], ...(Object.values(yValues) as number[]));
            const max = Math.max(values[1], ...(Object.values(yValues) as number[]));
            return [min, max];
        },
        [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    );

    const yScale = scaleLinear().domain([yMin, yMax]).range([graphHeight, margin.top]).nice();

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

    const numberOfSeries = inputData.series.filter((item) => item.id !== graphHighlightId).length;

    // Render highlights
    let highlights: HighlightType[];
    const highlightSeries = inputData.series.find((item) => item.id === graphHighlightId);
    if (highlightSeries) {
        highlights = inputData.values.reduce<HighlightType[]>((list, value) => {
            if (value.highlight) {
                list.push({
                    category: value.x,
                    color: value.highlight === true ? highlightSeries.color : value.highlight,
                });
            }
            return list;
        }, []);
        
        // If there is more than one series, draw a highlight behind the bars
        if (numberOfSeries > 1) {
            const highlightGroup = svg.append("g").attr("class", "highlight");
            const highlightPadding = barPadding * xScale.bandwidth() / 3;
            highlights.forEach((highlight) => {
                highlightGroup
                    .append("rect")
                    .attr("fill", highlight.color)
                    .attr("x", xScale(highlight.category)! - highlightPadding)
                    .attr("y", margin.top)
                    .attr("width", xScale.bandwidth() + highlightPadding * 2)
                    .attr("height", graphHeight - margin.top);
                }
            );
        }
    }

    // Draw bars
    const group = svg.append("g").attr("class", "bargroup");
    const barWidth = xScale.bandwidth() / inputData.series.filter((item) => item.id !== graphHighlightId).length;
    inputData.values.forEach((point) => {
        const { x, highlight, ...yValues } = point;
        Object.entries(yValues).forEach(([id, value], index) => {
            const series = inputData.series.find((series) => series.id === id)!;

            const xValue = xScale(x)! + barWidth * index;

            // If there is only one series, highlight by changing the bar's color
            let barColor: string;
            const selectedCategory = highlights.find((item) => item.category === x);
            if (numberOfSeries === 1 && selectedCategory) {
                barColor = selectedCategory.color;
            } else {
                barColor = series?.color;
            }

            group
                .append("rect")
                .attr("class", `bar bar-${id}`)
                .attr("fill", barColor)
                .attr("x", xValue)
                .attr("y", yScale(value!))
                .attr("width", barWidth)
                .attr("height", graphHeight - yScale(value!));
        });
    });
};
