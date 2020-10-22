import styled, { css } from "styled-components";
import { SpaceProps, space } from "styled-system";
import { getElevation } from "../../utils/theme";
import { Loader } from "./Loader";

type ButtonType = {
    /**
     * When enabled, will disable user input and display a greyed out colour.
     */
    disabled?: boolean;
    /**
     * This property is required when an `<Icon>` element is defined as a child.
     */
    iconAlign?: "left" | "right";
};

export const Button = styled.button.attrs({ type: "button" })<ButtonType>`
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    background-color: ${({ theme }) => theme.colors.controlButton};
    color: ${({ theme }) => theme.colors.controlOnButton};
    font-size: ${({ theme }) => theme.sizes.buttonTextSize};
    line-height: 1.2;
    outline: none;
    border: none;
    border-radius: ${({ theme }) => theme.sizes.radius};
    box-shadow: ${({ theme }) => getElevation(theme.elevation.button)};
    transition: background 0.3s;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
        background-color: ${({ theme }) => theme.colors.controlHighlightActive};
    }

    ${({ disabled }) =>
        disabled &&
        css`
            background-color: ${({ theme }) => theme.colors.controlButtonDisabled} !important;
            color: ${({ theme }) => theme.colors.controlOnButtonDisabled};
        `};

    svg,
    ${Loader} {
        display: inline-block;
        color: ${({ theme, disabled }) => (disabled ? theme.colors.icon : "inherit")} !important;
        ${({ iconAlign, theme }) =>
            iconAlign &&
            css`
                float: ${iconAlign};
                margin-${iconAlign === "left" ? "right" : "left"}: ${theme.space[2]}px;
        `};
    }
`;

export const CenteredButtonWrapper = styled.div<SpaceProps>`
    display: flex;
    align-items: center;
    flex-direction: column;

    ${space};
`;
