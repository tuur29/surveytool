import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import GraphResult, { GraphResultDoc } from "../../components/result/GraphResult";
import { AnswerDataUrl, resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Results/Graph",
    component: GraphResultDoc,
    argTypes: {
        dataUrl: { control: "text" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof GraphResultDoc>;
const Template: Story<PropsType> = (args) => (
    <div style={{ width: 900, height: 450 }}>
        <GraphResult
            config={{
                ...args,
                type: resultContentTypes.graph,
            }}
        />
    </div>
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const BarGraph = Template.bind({});
BarGraph.args = {
    hideLegend: false,
    dataUrl: "/mockBarGraph.json" as AnswerDataUrl,
    format: "bar",
    titleLabel: "Bar Graph",
};

export const LineChart = Template.bind({});
LineChart.args = {
    hideLegend: true,
    dataUrl: "/mockLineGraph.json" as AnswerDataUrl,
    format: "line",
    titleLabel: "Line Chart",
};
