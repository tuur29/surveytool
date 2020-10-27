import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Checkbox from "../../components/common/Checkbox";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Checkbox",
    component: Checkbox,
} as Meta;

type CheckboxType = React.ComponentProps<typeof Checkbox>;
const Template: Story<CheckboxType> = (args) => <Checkbox {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    checked: true,
};
