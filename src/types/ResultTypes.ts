export enum resultContentTypes {
    label = "label",
    button = "button",
    graph = "graph",
    iframe = "iframe",
}

/**
 * This is a special type of string that can contain {score} placeholder
 * and can start with POST; or GET; (Using POST will include the full list of answers).
 */
export type AnswerDataUrl = string;

export type ResultLabelType = {
    type: resultContentTypes.label;
    label: string; // can contain {score}, {scoreX} placeholder (scoreX -> score/10, score/20, score/100...)
    style: "title" | "description" | "scoreCounter";
    animate?: boolean; // will animate score placeholder if set
};

export type ResultButtonType = {
    type: resultContentTypes.button;
    label: string;
    function: "restart" | "postData" | "link";
    url?: string; // postData: will post data to url, link: open url in tab
};

export type ResultGraphType = {
    type: resultContentTypes.graph;
    format: "line" | "bar";
    dataUrl: AnswerDataUrl; // sends the answers to the endpoint, see GraphDataType ApiTypes.ts for result type
    titleLabel?: string;
};

export type ResultIFrameType = {
    type: resultContentTypes.iframe;
    url?: AnswerDataUrl; // Will open iframe with this url, see AnswerDataUrl for more info
};

export type AllResultContentType = ResultLabelType | ResultButtonType | ResultGraphType | ResultIFrameType;
