import { AnyStyledComponent, StyledComponentInnerComponent, StyledComponentInnerOtherProps } from "styled-components";
import { SeriesDataTypes } from "../../types/DataTypes";

/**
 * Helper to return string values of an enum
 */
export const getEnumValues = <T extends string | number>(input: Record<string, T>): T[] =>
    Object.values(input).filter((val) => typeof val === "string");

/**
 * Returns white/black depending on the perceived brightness of the hex input color
 *
 * Source: https://stackoverflow.com/a/39077686 + https://stackoverflow.com/a/11868159
 */
export const getContrastedTextColor = (hex: string): string => {
    const rgb = hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)!
        .map((x) => parseInt(x, 16));
    const bri = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
    return bri > 125 ? "black" : "white";
};

/**
 * Retrieve the actual prop type of a styled component
 * Source: https://stackoverflow.com/a/64055248
 *
 * @example type ButtonPropsType = InferStyledTypes<typeof Button>
 */
export type InferStyledTypes<T extends AnyStyledComponent> = React.ComponentProps<StyledComponentInnerComponent<T>> &
    StyledComponentInnerOtherProps<T>;

/**
 * Set of shared argTypes for base question components
 */
export const sharedQuestionArgTypes = {
    id: { control: { disable: true }, table: { category: "Base question" } }, // also disable
    title: { table: { category: "Base question" } },
    required: { table: { category: "Base question" } },
    calcFunction: { table: { category: "Base question" } },
    image: { table: { category: "Base question" } },
    hints: { control: "array", table: { category: "Base question" } }, // also set array type
    type: { control: { disable: true }, table: { category: "Base question" } }, // also disable
};

/**
 * Copy of /public/mockBarGraph.json because Storybook cannot access from the public folder
 */
export const mockBarData: SeriesDataTypes<string> = {
    xLabel: "Abscissa",
    yLabel: "Ordinate",
    series: [
        { id: "y1", name: "Straight line", color: "red" },
        { id: "y2", name: "Upward parabola", color: "blue" },
        { id: "y3", name: "Level line", color: "green" },
        { id: "highlight", name: "Your score", color: "orange" },
    ],
    values: [
        { x: "cat1", y1: 14, y2: 0, y3: 25 },
        { x: "cat2", y1: 23, y2: 2.36, y3: 25, highlight: "purple" },
        { x: "cat3", y1: 32, y2: 6.75, y3: 25 },
        { x: "cat4", y1: 41, y2: 13.16, y3: 25, highlight: true },
        { x: "cat5", y1: 50, y2: 21.6, y3: 25, highlight: true },
        { x: "cat6", y1: 59, y2: 32.06, y3: 25 },
        { x: "cat7", y1: 68, y2: 44.55, y3: 25 },
        { x: "cat8", y1: 77, y2: 59.06, y3: 25 },
        { x: "cat9", y1: 86, y2: 75.6, y3: 25 },
    ],
};

/**
 * Copy of /public/mockBarGraph.json because Storybook cannot access from the public folder
 */
export const mockLineData: SeriesDataTypes<number> = {
    xLabel: "Abscissa",
    yLabel: "Ordinate",
    series: [
        { id: "y1", name: "Line", color: "red" },
        { id: "y2", name: "Upward parabola", color: "blue" },
        { id: "y3", name: "Downward parabola", color: "green" },
        { id: "highlight", name: "Your score", color: "orange" },
    ],
    values: [
        { x: 3.48448, highlight: "purple" },

        { x: 1, y1: 14 },
        { x: 2, y1: 23, highlight: true },
        { x: 3, y1: 32 },
        { x: 4, y1: 41 },
        { x: 5, y1: 50 },
        { x: 6, y1: 59 },
        { x: 7, y1: 68 },
        { x: 8, y1: 77 },
        { x: 9, y1: 86 },
        { x: 10, y1: 95 },

        { x: 0, y2: 0 },
        { x: 1.125, y2: 2.36 },
        { x: 2.25, y2: 6.75 },
        { x: 3.375, y2: 13.16 },
        { x: 4.5, y2: 21.6 },
        { x: 5.625, y2: 32.06 },
        { x: 6.75, y2: 44.55 },
        { x: 7.875, y2: 59.06 },
        { x: 9, y2: 75.6 },

        { x: 0, y3: 95 },
        { x: 0.5, y3: 96 },
        { x: 1, y3: 96.5 },
        { x: 1.5, y3: 96.5 },
        { x: 2, y3: 96 },
        { x: 2.5, y3: 95 },
        { x: 3, y3: 93.5 },
        { x: 3.5, y3: 91.5 },
        { x: 4, y3: 89 },
        { x: 4.5, y3: 86 },
        { x: 5, y3: 82.5 },
        { x: 5.5, y3: 78.5 },
        { x: 6, y3: 74 },
        { x: 6.5, y3: 69 },
        { x: 7, y3: 63.5 },
        { x: 7.5, y3: 57.5 },
        { x: 8, y3: 51 },
        { x: 8.5, y3: 44 },
        { x: 9, y3: 36.5 },
        { x: 9.5, y3: 28.5 },
        { x: 10, y3: 20 },
    ],
};
