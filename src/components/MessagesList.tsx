import React from "react";
import { removeMessage } from "../redux/messagesReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import Icon from "./common/Icon";
import { CloseButton, Description, Message, Title, Wrapper } from "./styles/Message";

// TODO: add way to integrate into existing error system instead of this one
// TODO: remove messages after a configurable timeout
// TODO: add animation when messages are dismissed
const MessagesList = (): JSX.Element | null => {
    const messages = useStoreSelector((state) => state.messages.list);
    const dispatch = useStoreDispatch();

    if (!messages.length) return null;
    return (
        <Wrapper>
            {messages.map((message) => (
                <Message key={message.id} type={message.type}>
                    <CloseButton onClick={() => dispatch(removeMessage(message.id))}>
                        <Icon type="close" color={message.type === "info" ? "onMessageInfo" : "onMessageError"} />
                    </CloseButton>
                    {message.title && <Title>{message.title}</Title>}
                    <Description>{message.description}</Description>
                </Message>
            ))}
            {/* TODO: add clear all button when more than 1 message */}
        </Wrapper>
    );
};

export default MessagesList;
