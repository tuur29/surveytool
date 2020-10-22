import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LabelResult from "../../components/result/LabelResult";
import { resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "2. Results/Text",
    component: LabelResult,
    argTypes: {
        style: {
            control: {
                type: "inline-radio",
                options: ["title", "description", "scoreCounter"],
            },
        },
    },
} as Meta;

type PropsType = React.ComponentProps<typeof LabelResult>["config"];
const Template: Story<PropsType> = (args) => (
    <LabelResult
        config={{
            type: resultContentTypes.label,
            ...(args as any),
        }}
    />
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Title = Template.bind({});
Title.args = {
    label: "Text",
    style: "title",
};

export const Description = Template.bind({});
Description.args = {
    label:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem. Duo Reges: constructio interrete. Sine ea igitur iucunde negat posse se vivere? Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Bonum incolumis acies: misera caecitas. Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit?",
    style: "description",
};
