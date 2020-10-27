import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Loader } from "../../components/styles/Loader";
import { InferStyledTypes } from "../../utils/utils";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Loader",
    component: Loader,
    // doc-gen for styled components doesn't work, so setting this up manually and hiding descriptions
    parameters: { controls: { expanded: false } },
} as Meta;

type LoaderType = Omit<InferStyledTypes<typeof Loader>, "ref">;
const Template: Story<LoaderType> = (args) => <Loader {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    size: 50,
};
