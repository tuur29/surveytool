import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button } from "../../components/styles/Button";
import { InferStyledTypes } from "../../utils/utils";
import Icon from "../../components/common/Icon";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Styles/Button",
    component: Button,
} as Meta;

type PropType = InferStyledTypes<typeof Button>;
const Template: Story<PropType> = (args) => <Button {...(args as any)} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    children: "Click me",
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    children: "Click me",
};

export const IconLeft = Template.bind({});
IconLeft.args = {
    iconAlign: "left",
    children: (
        <>
            <Icon type="check" /> Click me
        </>
    ),
};
