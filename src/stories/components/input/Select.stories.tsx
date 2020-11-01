import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Select from "../../../components/common/Select";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Input/Select",
    component: Select,
    argTypes: {
        onSelectOption: { action: "onSelectOption" },
    },
} as Meta;

type SelectType = React.ComponentProps<typeof Select>;
const Template: Story<SelectType> = (args) => <Select {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    options: [
        { id: "1", title: "First option" },
        { id: "2", title: "Second option" },
        { id: "3", title: "Third{hint} option", hints: ["First hint"] },
    ],
};

export const Selected = Template.bind({});
Selected.args = {
    ...Default.args,
    selectedOptionId: "2",
};

export const SelectedHint = Template.bind({});
SelectedHint.args = {
    ...Default.args,
    selectedOptionId: "3",
};
