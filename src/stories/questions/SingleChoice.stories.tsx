import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SingleChoiceQuestion from "../../components/questions/SingleChoiceQuestion";
import { questionTypes } from "../../types/QuestionTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "1. Questions/Single Choice",
    component: SingleChoiceQuestion,
} as Meta;

type PropsType = React.ComponentProps<typeof SingleChoiceQuestion>["question"];
const Template: Story<PropsType> = (args) => (
    <SingleChoiceQuestion
        question={{
            id: "EDJUJDO", // TODO: need to look into better ids
            type: questionTypes.single,
            ...(args as any),
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    title: "Do you accept?",
};
