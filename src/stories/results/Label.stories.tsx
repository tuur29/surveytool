import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LabelResult, { PropsType } from "../../components/result/LabelResult";
import { resultContentTypes } from "../../types/ResultTypes";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Results/Text",
    component: LabelResult,
} as Meta;

const Template: Story<PropsType> = (args) => <LabelResult {...args} />;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const Title = Template.bind({});
Title.args = {
    config: {
        type: resultContentTypes.label,
        label: "Text",
        style: "title",
    },
};

export const Description = Template.bind({});
Description.args = {
    config: {
        type: resultContentTypes.label,
        label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem. Duo Reges: constructio interrete. Sine ea igitur iucunde negat posse se vivere? Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Bonum incolumis acies: misera caecitas. Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit?",
        style: "description",
    },
};
