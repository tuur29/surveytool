import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TextQuestion, { TextQuestionDoc } from "../../components/questions/TextQuestion";
import { TextQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Questions/Text",
    component: TextQuestionDoc,
    argTypes: {
        hints: { control: "array" },
        defaultIds: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof TextQuestionDoc>;
const Template: Story<PropsType> = (args) => (
    <TextQuestion
        question={{
            ...args,
            type: questionTypes.text,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Text = Template.bind({});
Text.args = {
    ...(mockConfig.questions?.find((question) => question.id === "PZQUDAF") as TextQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};

export const Number = Template.bind({});
Number.args = {
    ...(mockConfig.questions?.find((question) => question.id === "PXCHUDAK") as TextQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};

export const Email = Template.bind({});
Email.args = {
    ...(mockConfig.questions?.find((question) => question.id === "CUIHUDAK") as TextQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};
