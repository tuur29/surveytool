import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SingleChoiceQuestion, { SingleChoiceQuestionDoc } from "../../components/questions/SingleChoiceQuestion";
import { SingleChoiceQuestionType } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups, populateQuestionHash } from "../../utils/utils";
import { sharedQuestionArgTypes } from "../utils/utils";
import { getSharedQuestionParams } from "../utils/components";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

const description = `
- Represented by a **checkbox**
- Answer value: \`boolean\`
- Default score value: 0 for unchecked, 1 for checked
`;

export default {
    title: "Questions/Single Choice",
    component: SingleChoiceQuestionDoc,
    argTypes: sharedQuestionArgTypes,
    parameters: getSharedQuestionParams(description),
} as Meta;

type PropsType = React.ComponentProps<typeof SingleChoiceQuestionDoc>;
const Template: Story<PropsType> = (args) => <SingleChoiceQuestion question={args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "interested",
    ) as SingleChoiceQuestionType,
);
