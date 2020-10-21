import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SingleChoiceQuestion, { PropsType } from "../../components/questions/SingleChoiceQuestion";
import { questionTypes } from "../../types/QuestionTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Questions/SingleChoice",
    component: SingleChoiceQuestion,
} as Meta;

const Template: Story<PropsType> = (args) => <SingleChoiceQuestion {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    question: {
        id: "EDJUJDO", // TODO: need to look into better ids
        type: questionTypes.single,
        title: "Do you accept?",
    },
};
