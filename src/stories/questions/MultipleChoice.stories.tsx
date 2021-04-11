import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MultipleChoiceQuestion, { MultipleChoiceQuestionDoc } from "../../components/questions/MultipleChoiceQuestion";
import { MultipleChoiceQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups } from "../../utils/utils";
import { sharedQuestionArgTypes } from "../utils/utils";
import { getSharedQuestionParams } from "../utils/components";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

const description = `
- Represented by a **list of checkboxes / radio buttons / dropdown**
- Answer value: a list of ids (only a single item in the case of \`inputType=radio\` or \`inputType=select\`)
- Default score value:
  - In case of \`inputType=check\`: value is the amount of items checked
  - Default case: the index of the option that is selected
`;

export default {
    title: "Questions/Multiple Choice",
    component: MultipleChoiceQuestionDoc,
    argTypes: {
        ...sharedQuestionArgTypes,
        defaultIds: { control: "array" },
    },
    parameters: getSharedQuestionParams(description),
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
        (question) => question.id === "toppings",
    ) as MultipleChoiceQuestionType),
};

export const Radio = Template.bind({});
Radio.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "flavour",
    ) as MultipleChoiceQuestionType),
};

export const Select = Template.bind({});
Select.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "location",
    ) as MultipleChoiceQuestionType),
};
