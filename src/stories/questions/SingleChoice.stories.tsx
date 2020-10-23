import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SingleChoiceQuestion, { SingleChoiceQuestionDoc } from "../../components/questions/SingleChoiceQuestion";
import { questionTypes } from "../../types/QuestionTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Questions/Single Choice",
    component: SingleChoiceQuestionDoc,
    argTypes: {
        hints: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof SingleChoiceQuestionDoc>;
const Template: Story<PropsType> = (args) => (
    <SingleChoiceQuestion
        question={{
            id: "EDJUJDO", // TODO: need to look into better mock ids
            type: questionTypes.single,
            ...args,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    title: "Do you accept the terms and conditions{hint}?",
    hints: ["See below..."],
    checkedByDefault: false,
};
