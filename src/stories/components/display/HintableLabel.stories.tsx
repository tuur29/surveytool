import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import HintableLabel from "../../../components/common/HintableLabel";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Display/HintableLabel",
    component: HintableLabel,
    argTypes: {
        hints: { control: "array" },
    },
} as Meta;

type HintableLabelType = React.ComponentProps<typeof HintableLabel>;
const Template: Story<HintableLabelType> = (args) => <HintableLabel {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    hints: ["Hint 1", "Second Hint"],
    label: "This is a piece {hint} of text containing 2 hints{hint}",
};
