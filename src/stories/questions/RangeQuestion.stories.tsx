import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import RangeQuestion, { RangeQuestionDoc } from "../../components/questions/RangeQuestion";
import { RangeQuestionType, questionTypes } from "../../types/QuestionTypes";
import { mockConfig } from "../../utils/mockConfig";
import { flattenQuestionGroups, populateQuestionHash } from "../../utils/utils";
import { sharedQuestionArgTypes } from "../utils/utils";
import { getSharedQuestionParams } from "../utils/components";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

const description = `
- Represented by either a slider or list of radio buttons
- Answer value: number
- Default score value: the selected number value
`;

export default {
    title: "Questions/Range",
    component: RangeQuestionDoc,
    argTypes: {
        tickCount: { table: { category: "Slider only" } },
        tickValues: { table: { category: "Slider only" } },
        tickLabels: { table: { category: "Slider only" } },
        ...sharedQuestionArgTypes,
    },
    parameters: getSharedQuestionParams(description),
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
Slider.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "amount") as RangeQuestionType,
);

export const RadioButtons = Template.bind({});
RadioButtons.args = populateQuestionHash(
    flattenQuestionGroups(mockConfig.groups!).find((question) => question.id === "rating-product") as RangeQuestionType,
);
