import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import IFrameResult, { IFrameResultDoc } from "../../components/result/IFrameResult";
import { AnswerDataUrl, resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Results/IFrame",
    component: IFrameResultDoc,
    argTypes: {
        url: { control: "text" },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof IFrameResultDoc>;
const Template: Story<PropsType> = (args) => (
    <IFrameResult
        config={{
            type: resultContentTypes.iframe,
            ...args,
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Default = Template.bind({});
Default.args = {
    url: "https://www.example.org/" as AnswerDataUrl,
    height: 300,
    disableScroll: true,
};
