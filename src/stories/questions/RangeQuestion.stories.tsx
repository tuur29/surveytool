import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import RangeQuestion, { RangeQuestionDoc } from "../../components/questions/RangeQuestion";
import { RangeQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups } from "../../utils/utils";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Questions/Range",
    component: RangeQuestionDoc,
    argTypes: {
        hints: { control: "array" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof RangeQuestionDoc>;
const Template: Story<PropsType> = (args) => (
    <RangeQuestion
        question={{
            ...args,
            type: questionTypes.range,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Slider = Template.bind({});
Slider.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "QXCHUKIH") as RangeQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};

export const RadioButtons = Template.bind({});
RadioButtons.args = {
    ...(flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "PDJRLCWT") as RangeQuestionType),
    // Stop storybook from making these props
    ["type" as string]: undefined,
};
