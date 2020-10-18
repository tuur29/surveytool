export enum messageTypes {
    error = "error",
    info = "info",
    neutral = "neutral",
}

export type MessageType = {
    id: number; // auto generated
    title?: string;
    description: string;
    type: messageTypes;
    timestamp: number;
};
