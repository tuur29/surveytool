import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button } from "../../../components/styles/Button";
import Icon from "../../../components/common/Icon";
import { InferStyledTypes } from "../../utils/utils";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Input/Button",
    component: Button,
    // doc-gen for styled components doesn't work, so setting this up manually and hiding descriptions
    argTypes: {
        onClick: { action: "clicked" },
        iconAlign: {
            control: {
                type: "inline-radio",
                options: ["left", "right"],
            },
        },
    },
    parameters: { controls: { expanded: false } },
} as Meta;

type ButtonType = Omit<InferStyledTypes<typeof Button>, "ref">;
const Template: Story<ButtonType> = (args) => (
    <Button {...args}>
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
