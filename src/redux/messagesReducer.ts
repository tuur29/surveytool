/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring

import { MessageType } from "../types/Messages";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialMessagesState = {
    list: [] as MessageType[],
};
export type MessagesState = typeof initialMessagesState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const addMessages = (messages: Omit<MessageType, "id">[]) => ({
    type: "MESSAGES_ADD" as const,
    messages,
});

export const removeMessage = (messageId: number) => ({
    type: "MESSAGES_REMOVE" as const,
    messageId,
});

export const clearMessages = () => ({
    type: "MESSAGES_CLEAR" as const,
});

export type MessagesActions =
    | ReturnType<typeof addMessages>
    | ReturnType<typeof removeMessage>
    | ReturnType<typeof clearMessages>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const messagesReducer = (
    state: MessagesState = initialMessagesState,
    action: MessagesActions,
): MessagesState => {
    switch (action.type) {
        case "MESSAGES_ADD": {
            const lastId = state.list[state.list.length - 1]?.id || 0;
            return {
                ...state,
                list: [...state.list, ...action.messages.map((input, index) => ({ ...input, id: lastId + index + 1 }))],
            };
        }
        case "MESSAGES_REMOVE": {
            return {
                ...state,
                list: [...state.list.filter((message) => message.id !== action.messageId)],
            };
        }
        case "MESSAGES_CLEAR": {
            return {
                ...state,
                list: [],
            };
        }
        default: {
            return state;
        }
    }
};
