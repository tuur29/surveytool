import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Title, Description, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs/blocks";
import { BaseQuestion, QuestionGroup } from "../../types/QuestionTypes";
import { ImageType } from "../../types/CommonTypes";
import { generalLabels, messageLabels, questionLabels, resultLabels } from "../../utils/labels";
import { ColorType, defaultThemes } from "../../utils/theme";
import { getContrastedTextColor } from "./utils";

// ----------------------------------------------------------------------
// Labels
// ----------------------------------------------------------------------

// These components are used to automatically generate ArgsTables for each group of labels
export const GeneralLabelDoc = (props: Partial<typeof generalLabels> = generalLabels): null => props && null;
export const MessageLabelDoc = (props: Partial<typeof messageLabels> = messageLabels): null => props && null;
export const QuestionLabelDoc = (props: Partial<typeof questionLabels> = questionLabels): null => props && null;
export const ResultLabelDoc = (props: Partial<typeof resultLabels> = resultLabels): null => props && null;
export const QuestionGroupDoc = (props: QuestionGroup): null => props && null;
export const QuestionBaseDoc = (props: BaseQuestion): null => props && null;
export const QuestionImageTypeDoc = (props: ImageType): null => props && null;

// ----------------------------------------------------------------------
// Questions
// ----------------------------------------------------------------------

/** Set of shared params for question components */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSharedQuestionParams = (description: string) => ({
    viewMode: "docs", // set default to docs mode
    previewTabs: {
        "storybook/docs/panel": { hidden: false, index: -1 }, // unhide docs panel
    },
    docs: {
        page: () => (
            <>
                <Title />
                <Description markdown={description} />
                <ArgsTable story={PRIMARY_STORY} />
                <Stories includePrimary />
            </>
        ),
    },
});

// ----------------------------------------------------------------------
// Colors
// ----------------------------------------------------------------------

/** Used for both swatches and text components, adds easy copy/paste functionality */
const ColorComponent = (props: {
    // shared
    name?: ColorType;
    // swatch
    value?: string;
    size?: number;
    // text
    theme?: "light" | "dark";
    // for styled components
    className: string;
}): JSX.Element => {
    const [copied, setCopied] = useState(false);
    const theme = defaultThemes[props.theme === "dark" ? "darkTheme" : "lightTheme"];
    return (
        <div
            className={`${props.className}${copied ? " copied" : ""}`}
            onMouseLeave={() => setCopied(false)}
            onClick={() => {
                navigator.clipboard.writeText(props.value || (props.name ? theme.colors[props.name] : ""));
                setCopied(true);
            }}
        >
            {props.name ?? props.value}
        </div>
    );
};

/** Shows popup over swatch / text ion mouse hover */
const colorPopup = (text: string) => css`
    &:hover::after {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: calc(100% + 8px);
        display: block;
        content: "${text}";
        padding: 8px;
        background: white;
        color: #000;
        border-radius: 4px;
        box-shadow: 0 0 3px grey;
        transform: translateY(-50%);
        white-space: nowrap;
    }

    &.copied:hover::after {
        content: "✅ Copied";
    }
`;

/** Square preview for colors. Popup contains the name and hex value */
export const ColorSwatch = styled(ColorComponent)`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${({ size }) => size || 20}px;
    height: ${({ size }) => size || 20}px;
    margin: 8px;
    background-color: ${({ value }) => value || "grey"};
    color: ${({ value }) => getContrastedTextColor(value!)};
    border: ${({ size }) => (size || 20) / 10}px solid white;
    border-radius: 4px;
    box-shadow: 0 0 3px grey;
    vertical-align: middle;
    cursor: pointer;

    ${({ value }) => colorPopup(value!)}
`;

/** Renders the color's name with a colored background. Popup contains hex value. */
export const ColorText = styled(ColorComponent)`
    position: relative;
    display: inline-block;
    margin: 4px;
    padding: 2px 8px;
    border: 1px solid grey;
    border-radius: 4px;
    vertical-align: middle;
    cursor: pointer;

    ${({ name, theme }) => {
        const value = defaultThemes[theme === "dark" ? "darkTheme" : "lightTheme"].colors[name!];
        return css`
            background-color: ${value};
            color: ${getContrastedTextColor(value)};
            ${colorPopup(value)}
        `;
    }}
`;
