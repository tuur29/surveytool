import React from "react";
import styled, { css } from "styled-components";
import { Title, Description, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs/blocks";
import { BaseQuestion, QuestionGroup } from "../../types/QuestionTypes";
import { ImageType } from "../../types/CommonTypes";
import { generalLabels, messageLabels, questionLabels, resultLabels } from "../../utils/labels";
import { ColorType, defaultThemes } from "../../utils/theme";

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
        border-radius: 4px;
        box-shadow: 0 0 3px grey;
        transform: translateY(-50%);
    }
`;

/** Square preview for colors. Popup contains the name and hex value */
export const ColorSwatch = styled.div<{ value: string; name?: string; size?: number }>`
    position: relative;
    display: inline-block;
    width: ${({ size }) => size || 20}px;
    height: ${({ size }) => size || 20}px;
    margin: 8px;
    background-color: ${({ value }) => value || "grey"};
    border: ${({ size }) => (size || 20) / 10}px solid white;
    border-radius: 4px;
    box-shadow: 0 0 3px grey;
    vertical-align: middle;

    ${({ name, value }) => colorPopup(name ? `${name} ${value}` : value)}
`;

/** Renders the color's name with a colored background. Popup contains hex value. */
export const ColorText = styled.div<{ color: ColorType; lightText?: boolean }>`
    position: relative;
    display: inline-block;
    margin: 4px;
    padding: 2px 8px;
    background-color: ${({ color }) => defaultThemes.lightTheme.colors[color]};
    border: 1px solid grey;
    border-radius: 4px;
    vertical-align: middle;

    &::before {
        color: ${({ lightText }) => (lightText ? "white" : "black")};
        content: "${({ color }) => color}";
    }

    ${({ color }) => colorPopup(defaultThemes.lightTheme.colors[color])}
`;
