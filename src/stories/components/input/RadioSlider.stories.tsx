import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import RadioSlider from "../../../components/common/RadioSlider";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Input/RadioSlider",
    component: RadioSlider,
    argTypes: {
        onChange: { action: "onClick" },
        tickValues: { control: "array" },
        tickLabels: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof RadioSlider>;
const Template: Story<PropsType> = (args) => <RadioSlider {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    min: 0,
    max: 100,
    value: 30,
    direction: "increase",
    step: 10,
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
    ...Default.args,
    tickValues: [0, 30, 50, 70, 100],
    tickLabels: ["Min", null, " ", "Almost there", "Max"],
};
