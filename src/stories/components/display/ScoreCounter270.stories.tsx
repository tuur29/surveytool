import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ScoreCounter270 from "../../../components/common/ScoreCounter270";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Display/ScoreCounter270",
    component: ScoreCounter270,
} as Meta;

type ScoreCounter270Type = React.ComponentProps<typeof ScoreCounter270>;
const Template: Story<ScoreCounter270Type> = (args) => <ScoreCounter270 {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    dialPercentage: 0.4,
    label: "40%",
    animate: true,
};
