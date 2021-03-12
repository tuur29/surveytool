import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LabelResult, { LabelResultDoc } from "../../components/result/LabelResult";
import { resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Results/Label",
    component: LabelResultDoc,
} as Meta;

type PropsType = React.ComponentProps<typeof LabelResultDoc>;
const Template: Story<PropsType> = (args) => (
    <LabelResult
        config={{
            ...args,
            type: resultContentTypes.label,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Text = Template.bind({});
Text.args = {
    label: "You scored {score} points. This equates to a score of {score100}% or {score20}/20.",
    style: "title",
};

export const ScoreCounter180 = Template.bind({});
ScoreCounter180.args = {
    label: "{score}%",
    style: "scoreCounter180",
    animate: true,
};

export const ScoreCounter270 = Template.bind({});
ScoreCounter270.args = {
    label: "{score}%",
    style: "scoreCounter270",
    animate: true,
};
