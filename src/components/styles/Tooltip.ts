import styled, { css } from "styled-components";
import { IconWrapper } from "../common/Icon";
import { getElevation, getTooltipMobileBackdrop } from "../../utils/theme";

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
    border-radius: ${({ theme }) => theme.sizes.radius};
    transition: opacity 0.3s;

    ${({ show }) => css`
        opacity: ${show ? 1 : 0};
        pointer-events: ${show ? "initial" : "none"};
    `};

    ${IconWrapper} {
        margin-right: ${({ theme }) => theme.space[2]}px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 65vh;
        max-width: unset;
        margin: 0;
        padding: 15px;
        border-radius: ${({ theme }) => theme.sizes.radius} ${({ theme }) => theme.sizes.radius} 0 0;
        box-shadow: ${getTooltipMobileBackdrop};
        overflow: auto;

        ${IconWrapper} {
            float: right;
        }

        img {
            max-width: 100%;
        }
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
