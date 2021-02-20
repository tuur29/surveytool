import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MultipleChoiceQuestion, { MultipleChoiceQuestionDoc } from "../../components/questions/MultipleChoiceQuestion";
import { MultipleChoiceQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups } from "../../utils/utils";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Questions/Multiple Choice",
    component: MultipleChoiceQuestionDoc,
    argTypes: {
        hints: { control: "array" },
        defaultIds: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof MultipleChoiceQuestionDoc>;
const Template: Story<PropsType> = (args) => (
    <MultipleChoiceQuestion
        question={{
            ...args,
            type: questionTypes.multiple,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Checkbox = Template.bind({});
Checkbox.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "ENARECZUD",
    ) as MultipleChoiceQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};

export const Radio = Template.bind({});
Radio.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "JIWMEFJA",
    ) as MultipleChoiceQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};

export const Select = Template.bind({});
Select.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "LPAKDUCZUD",
    ) as MultipleChoiceQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};
