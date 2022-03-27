import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TextQuestion, { TextQuestionDoc } from "../../components/questions/TextQuestion";
import { TextQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups, populateQuestionHash } from "../../utils/utils";
import { sharedQuestionArgTypes } from "../utils/utils";
import { getSharedQuestionParams } from "../utils/components";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

const description = `
- Represented by a text input field
- Answer value: the text provided by the user
- Default score value:
  - In case of \`inputType=number\`: the number value
  - Default case: 0
`;

export default {
    title: "Questions/Text",
    component: TextQuestionDoc,
    argTypes: sharedQuestionArgTypes,
    parameters: getSharedQuestionParams(description),
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
Text.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "name") as TextQuestionType,
);

export const Number = Template.bind({});
Number.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "flavour-shared") as TextQuestionType,
);

export const Email = Template.bind({});
Email.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "mailaddress") as TextQuestionType,
);
