import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ButtonResult, { ButtonResultDoc } from "../../components/result/ButtonResult";
import { AnswerDataUrl, resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Results/Button",
    component: ButtonResultDoc,
    argTypes: {
        url: { control: "text" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof ButtonResultDoc>;
const Template: Story<PropsType> = (args) => (
    <ButtonResult
        config={{
            ...args,
            type: resultContentTypes.button,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Restart = Template.bind({});
Restart.args = {
    function: "restart",
    label: "Clear data",
};

export const Link = Template.bind({});
Link.args = {
    function: "link",
    label: "Go to Google",
    url: "https://www.google.com/" as AnswerDataUrl,
    openInTab: true,
};
