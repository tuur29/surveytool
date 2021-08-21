export enum messageTypes {
    error = "error",
    info = "info",
    neutral = "neutral",
}

export type ExternalMessageType = {
    title?: string;
    description: string;
    type: messageTypes;
    timestamp?: number;
};

export type MessageType = ExternalMessageType & {
    id: number; // auto generated
};
