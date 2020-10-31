export enum resultContentTypes {
    label = "label",
    button = "button",
    graph = "graph",
    iframe = "iframe",
}

/**
 * This is a special type of string that can contain {score} placeholder
 * and can start with POST; or GET; (Using POST will include the full list of answers).
 *
 * Defining this as "answerDataUrl" is a bit of a workaround so we can have strict typing instead of just any string.
 * Since Typescript is stripped away once in the browser it doesn't really matter except for defining typed mockdata.
 */
export type AnswerDataUrl = "answerDataUrl";

export type ResultLabelType = {
    type: resultContentTypes.label;
    /** Can contain {score}, {scoreX} placeholder (scoreX -> score/10, score/20, score/100...). */
    label: string;
    style: "title" | "description" | "scoreCounter";
    /** When enabled the score placeholders will count up in an animation. */
    animate?: boolean;
};

export type ResultButtonType = {
    type: resultContentTypes.button;
    label: string;
    function: "restart" | "postData" | "link"; // postData: will post data to url, link: open url in tab
    url?: AnswerDataUrl;
    openInTab?: boolean;
};

export type ResultGraphType = {
    type: resultContentTypes.graph;
    format: "line" | "bar";
    dataUrl: AnswerDataUrl; // sends the answers to the endpoint, see GraphDataType ApiTypes.ts for result type
    titleLabel?: string;
    hideLegend?: boolean;
};

export type ResultIFrameType = {
    type: resultContentTypes.iframe;
    url: AnswerDataUrl; // Will open iframe with this url, see AnswerDataUrl for more info, only supports GET; variant
    height?: number;
    disableScroll?: boolean;
};

export type AllResultContentType = ResultLabelType | ResultButtonType | ResultGraphType | ResultIFrameType;
