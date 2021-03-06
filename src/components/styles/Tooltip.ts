import styled, { css } from "styled-components";
import { IconWrapper } from "../common/Icon";
import { getElevation } from "../../utils/theme";

const TOOLTIP_BOUNDS_SIZE = 20;

export const TooltipContent = styled.span<{ show?: boolean }>`
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.tooltip};
    max-width: 300px;
    margin-top: -10px;
    margin-left: -32px;
    padding: 10px 15px;
    color: ${({ theme }) => theme.colors.onSurface};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => getElevation(theme.elevation.tooltip)};
    border-radius: 4px;
    transition: opacity 0.3s;

    ${({ show }) => css`
        opacity: ${show ? 1 : 0};
        pointer-events: ${show ? "initial" : "none"};
    `};

    ${IconWrapper} {
        margin-right: ${({ theme }) => theme.space[2]}px;
    }
`;

export const Tooltip = styled.span`
    user-select: none;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        display: inline-block;
        box-sizing: border-box;
        padding: ${TOOLTIP_BOUNDS_SIZE}px;
        margin-top: -${TOOLTIP_BOUNDS_SIZE / 2}px;
        margin-left: -${TOOLTIP_BOUNDS_SIZE / 2 - 3}px;
        pointer-events: none;
    }

    > ${IconWrapper} {
        margin-left: ${({ theme }) => theme.space[1]}px;
    }
`;
