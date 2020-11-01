import styled, { css } from "styled-components";
import { ColorType, defaultThemes } from "../../utils/theme";

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
        color: ${({ lightText }) => (lightText ? "white" : "dark")};
        content: "${({ color }) => color}";
    }

    ${({ color }) => colorPopup(defaultThemes.lightTheme.colors[color])}
`;
