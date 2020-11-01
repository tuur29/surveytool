import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Graph, { GraphDoc } from "../../../components/common/Graph";
import { mockBarData, mockLineData } from "../../utils/helpers";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Display/Graph",
    component: GraphDoc,
} as Meta;

// Graph props typing is pretty complex
// To make this more editable in storybook, we directly reference the nested objects here
type GraphType = React.ComponentProps<typeof GraphDoc> & { size: number };
const Template: Story<GraphType> = (args) => (
    <div style={{ width: args.size, height: args.size / 2 }}>
        <Graph type={args.type} data={{ ...args }} />
    </div>
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const BarChart = Template.bind({});
BarChart.args = {
    type: "bar",
    size: 600,
    ...mockBarData,
};

export const LineGraph = Template.bind({});
LineGraph.args = {
    type: "line",
    size: 600,
    ...mockLineData,
};
