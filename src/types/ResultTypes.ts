import { IconType } from "../components/common/Icon";
import { ImageType, ScoreDomainType } from "./CommonTypes";

export enum resultContentTypes {
    label = "label",
    button = "button",
    image = "image",
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

type BaseResult = {
    /** Optional, domain that determines when the content is visible */
    visibleScoreDomain?: ScoreDomainType;
    /** Pass true in case you want to decrease the size of a block. Can be used to show 2 scoreCounters next to eachother. */
    halfWidth?: boolean;
};

export type ResultLabelType = BaseResult & {
    type: resultContentTypes.label;
    /** Can contain {score}, {scoreX} placeholder (scoreX -> score/10, score/20, score/100...). */
    label: string;
    /** "title" and "description" only change font size, while "scoreCounter" will display the score in a dial. */
    style: "title" | "description" | "scoreCounter180" | "scoreCounter270";
    /** When enabled the score placeholders will count up in an animation. */
    animate?: boolean;
};

export type ResultButtonType = BaseResult & {
    type: resultContentTypes.button;
    /** Text to be displayed inside the button */
    label: string;
    /** A "restart" button will reset the user's input. "postData" will save the user's input to your server like the `postDataUrl` setting. "link" will redirect the user. */
    function: "restart" | "postData" | "link"; // postData: will post data to url, link: open url in tab
    /** Only necessary when function is "postData" or "link" */
    url?: AnswerDataUrl;
    /** Optional, only used when the function is "link" */
    openInTab?: boolean;
    /** Optional */
    icon?: IconType;
};

export type ResultImageType = BaseResult & {
    type: resultContentTypes.image;
} & Omit<ImageType, "alignment">;

export type ResultGraphType = BaseResult & {
    type: resultContentTypes.graph;
    /** Switches between a bar chart or line graph */
    format: "line" | "bar";
    /** Required. The tool will fetch this URL for data to be displayed, can contain `{score}` placeholder */
    dataUrl: AnswerDataUrl;
    /** Optional, will display a title above the graph. */
    titleLabel?: string;
    /** Optional, defaults to false. If enabled, the legend will not be displayed. */
    hideLegend?: boolean;
};

export type ResultIFrameType = BaseResult & {
    type: resultContentTypes.iframe;
    /** Required. The tool will display this url, can contain a `{score}` placeholder */
    url: AnswerDataUrl;
    /** Set a custom height for the IFrame. Defaults to 400px */
    height?: number;
    /** Will disable scrolling inside the IFrame when enabled. Optional, defaults to false. */
    disableScroll?: boolean;
};

export type AllResultContentType =
    | ResultLabelType
    | ResultButtonType
    | ResultImageType
    | ResultGraphType
    | ResultIFrameType;
