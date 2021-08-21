/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { ExternalMessageType } from "../../types/MessageTypes";

export const addMessages = (messages: ExternalMessageType[]) => ({
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
