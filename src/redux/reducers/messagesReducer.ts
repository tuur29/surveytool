import { MessageType } from "../../types/MessageTypes";
import { MessagesActions } from "../actions/messagesActions";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialMessagesState = {
    list: [] as MessageType[],
};
export type MessagesState = typeof initialMessagesState;

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
