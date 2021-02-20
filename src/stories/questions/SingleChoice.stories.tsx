import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SingleChoiceQuestion, { SingleChoiceQuestionDoc } from "../../components/questions/SingleChoiceQuestion";
import { questionTypes, SingleChoiceQuestionType } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups } from "../../utils/utils";

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
            ...args,
            id: "EDJUJDO",
            type: questionTypes.single,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find(
        (question) => question.id === "EDJUJDO",
    ) as SingleChoiceQuestionType),
    // Stop storybook from making these props
    ["id" as string]: undefined,
    ["type" as string]: undefined,
};
