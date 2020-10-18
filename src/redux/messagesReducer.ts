/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring

import { isDev } from "../utils/utils";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

type MessageType = { id: string; title?: string; description: string; type: "info" | "error"; timestamp: number };

const mockMessages: MessageType[] = [
    {
        id: "1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis.",
        type: "info",
        timestamp: 0,
    },
    {
        id: "2",
        title: "Title 2",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem.",
        type: "error",
        timestamp: 0,
    },
];

export const initialMessagesState = {
    list: (isDev(true) ? mockMessages : []) as MessageType[],
};
export type MessagesState = typeof initialMessagesState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const addMessages = (messages: MessageType[]) => ({
    type: "MESSAGES_ADD" as const,
    messages,
});

export const removeMessage = (messageId: string) => ({
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
            return {
                ...state,
                list: { ...state.list, ...action.messages },
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
