import styled, { css } from "styled-components";
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
