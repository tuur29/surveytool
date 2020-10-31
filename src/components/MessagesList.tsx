import React from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import useLabel from "../hooks/useLabel";
import { clearMessages, removeMessage } from "../redux/messagesReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { messageTypes } from "../types/Messages";
import Icon from "./common/Icon";
import { CloseButton, Description, Message, Title, Wrapper, DismissLabel, textColor } from "./styles/Message";

const MessagesList = (): JSX.Element | null => {
    const messages = useStoreSelector((state) => state.messages.list);
    const dispatch = useStoreDispatch();
    const dismissLabel = useLabel("messageDismissAll");

    return (
        <Wrapper>
            {/* Messages list */}
            <TransitionGroup>
                {messages.map((message) => (
                    <Transition key={message.id} timeout={200}>
                        {(state) => (
                            <Message type={message.type} show={state === "entered"}>
                                <CloseButton onClick={() => dispatch(removeMessage(message.id))}>
                                    <Icon type="closeCircle" color={textColor[message.type]} />
                                </CloseButton>
                                {message.title && <Title>{message.title}</Title>}
                                <Description>{message.description}</Description>
                            </Message>
                        )}
                    </Transition>
                ))}
            </TransitionGroup>

            {/* Clear all button */}
            <Transition in={messages.length > 1} timeout={200}>
                {(state) =>
                    state !== "exited" && (
                        <Message
                            show={state === "entered"}
                            type={messageTypes.neutral}
                            onClick={() => dispatch(clearMessages())}
                        >
                            <DismissLabel>{dismissLabel}</DismissLabel>
                        </Message>
                    )
                }
            </Transition>
        </Wrapper>
    );
};

export default MessagesList;
