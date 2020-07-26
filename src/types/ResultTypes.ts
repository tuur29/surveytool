
export enum resultContentType {
    label = "label",
    button = "button",
    graph = "graph",
    iframe = "iframe",
}

export type ResultLabelType = {
    type: resultContentType.label,
    label: string; // can contain {score} placeholder
    style: "title" | "description" | "scoreCounter";
    animate?: boolean; // will animate score placeholder if set
};

export type ResultButtonType = {
    type: resultContentType.button,
    label: string;
    function: "restart" | "saveData" | "link";
    url?: string; // same function as saveDataUrl, but require a user to send manually
};

export type ResultGraphType = {
    type: resultContentType.graph,
    xLabel?: string;
    yLabel?: string;
    titleLabel?: string;
};

export type ResultIFrameType = {
    type: resultContentType.iframe,
    url?: string;
    postData?: boolean;
};

export type AllResultsType = ResultLabelType | ResultButtonType | ResultGraphType | ResultIFrameType;
