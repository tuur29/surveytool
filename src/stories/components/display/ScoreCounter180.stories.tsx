import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ScoreCounter180 from "../../../components/common/ScoreCounter180";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Display/ScoreCounter180",
    component: ScoreCounter180,
} as Meta;

type ScoreCounter180Type = React.ComponentProps<typeof ScoreCounter180>;
const Template: Story<ScoreCounter180Type> = (args) => <ScoreCounter180 {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    dialPercentage: 0.4,
    label: "40%",
    animate: true,
};
