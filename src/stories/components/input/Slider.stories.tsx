import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Slider from "../../../components/common/Slider";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Input/Slider",
    component: Slider,
    argTypes: {
        onChange: { action: "onChange" },
        tickValues: { control: "array" },
        tickLabels: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof Slider>;
const Template: Story<PropsType> = (args) => <Slider {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    min: 0,
    max: 100,
    value: 25,
    direction: "increase",
    step: 1,
    tickCount: 3,
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
    ...Default.args,
    tickValues: [0, 25, 50, 75, 100],
    tickLabels: ["Min", null, " ", "Almost there", "Max"],
};
