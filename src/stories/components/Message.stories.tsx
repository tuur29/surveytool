import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { CloseButton, Description, Message, textColor, Title } from "../../components/styles/Message";
import { MessageType, messageTypes } from "../../types/Messages";
import { getEnumValues } from "../utils/helpers";
import Icon from "../../components/common/Icon";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Message",
    component: Message,
    // doc-gen for styled components doesn't work, so setting this up manually and hiding descriptions
    argTypes: {
        onDismiss: { action: "dismissed" },
        type: {
            control: {
                type: "inline-radio",
                options: getEnumValues(messageTypes),
            },
        },
    },
    parameters: { controls: { expanded: false } },
} as Meta;

type DocMessageType = MessageType & {
    onDismiss: (id: number) => void;
};
const Template: Story<DocMessageType> = (args) => (
    <Message type={args.type} show>
        <CloseButton onClick={() => args.onDismiss(args.id)}>
            <Icon type="close" color={textColor[args.type]} />
        </CloseButton>
        {args.title && <Title>{args.title}</Title>}
        <Description>{args.description}</Description>
    </Message>
);

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
    id: 1,
    title: "Error",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis.",
    type: messageTypes.error,
};

export const InfoMessage = Template.bind({});
InfoMessage.args = {
    id: 2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis.",
    type: messageTypes.info,
};
