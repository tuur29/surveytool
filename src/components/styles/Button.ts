import styled, { css } from "styled-components";
import { SpaceProps, space } from "styled-system";
import { getElevation } from "../../utils/theme";
import { Loader } from "./Loader";

export const CenteredButtonWrapper = styled.div<SpaceProps>`
    display: flex;
    align-items: center;
    flex-direction: column;

    ${space};
`;

export const Button = styled.button.attrs({ type: "button" })<{ disabled?: boolean; iconAlign?: "left" | "right" }>`
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    background-color: ${({ theme }) => theme.colors.controlButton};
    color: ${({ theme }) => theme.colors.controlOnButton};
    font-size: ${({ theme }) => theme.sizes.buttonTextSize};
    outline: none;
    border: none;
    border-radius: ${({ theme }) => theme.sizes.radius};
    box-shadow: ${getElevation(2)};
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
                margin-${iconAlign === "left" ? "right" : "left"}: ${theme.space[2]}px;
        `};
    }
`;
