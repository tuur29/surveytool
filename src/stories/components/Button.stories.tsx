import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button } from "../../components/styles/Button";
import { InferStyledTypes } from "../../utils/utils";
import Icon from "../../components/common/Icon";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "3. Components/Button",
    component: Button,
} as Meta;

type PropsType = InferStyledTypes<typeof Button>;
const Template: Story<PropsType> = (args) => (
    <Button {...(args as any)}>
        {args.iconAlign && <Icon type="check" />}
        {args.children}
    </Button>
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    children: "Click me",
};

export const IconButton = Template.bind({});
IconButton.args = {
    disabled: false,
    iconAlign: "left",
    children: "Click me",
};
