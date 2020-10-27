import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ScoreCounter from "../../components/common/ScoreCounter";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/ScoreCounter",
    component: ScoreCounter,
} as Meta;

type ScoreCounterType = React.ComponentProps<typeof ScoreCounter>;
const Template: Story<ScoreCounterType> = (args) => <ScoreCounter {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    dialPercentage: 0.4,
    label: "40%",
    size: 200,
    borderSize: 20,
};
