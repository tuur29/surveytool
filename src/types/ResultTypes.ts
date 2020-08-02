
export enum resultContentTypes {
    label = "label",
    button = "button",
    graph = "graph",
    iframe = "iframe",
}

export type ResultLabelType = {
    type: resultContentTypes.label,
    label: string; // can contain {score}, {scoreX} placeholder (scoreX -> score/10, score/20, score/100...)
    style: "title" | "description" | "scoreCounter";
    animate?: boolean; // will animate score placeholder if set
};

export type ResultButtonType = {
    type: resultContentTypes.button,
    label: string;
    function: "restart" | "saveData" | "link";
    url?: string; // same function as saveDataUrl, but require a user to send manually
};

export type ResultGraphType = {
    type: resultContentTypes.graph,
    xLabel?: string;
    yLabel?: string;
    titleLabel?: string;
};

export type ResultIFrameType = {
    type: resultContentTypes.iframe,
    url?: string;
    postData?: boolean;
};

export type AllResultContentType = ResultLabelType | ResultButtonType | ResultGraphType | ResultIFrameType;
