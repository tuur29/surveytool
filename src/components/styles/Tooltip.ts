import styled, { css } from "styled-components";
import { IconWrapper } from "../../svg/Icon";

const TOOLTIP_BOUNDS_SIZE = 20;

export const TooltipContent = styled.span<{ show?: boolean }>`
    position: absolute;
    margin-top: -10px; /* TODO: fix these hardcoded */
    margin-left: -32px;
    background: ${({ theme }) => theme.colors.backSoft};
    color: ${({ theme }) => theme.colors.foreSoft};
    box-shadow: 3px 3px 6px ${({ theme }) => theme.colors.foreShadow};
    padding: 10px 15px;
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
    &::before {
        content: "";
        position: absolute;
        display: inline-block;
        box-sizing: border-box;
        padding: ${TOOLTIP_BOUNDS_SIZE}px;
        margin-top: -${TOOLTIP_BOUNDS_SIZE / 2}px;
        margin-left: -${TOOLTIP_BOUNDS_SIZE / 2 - 3}px;
        pointer-events: none; /* TODO: this shouldn't be necessary, breads the touchzone function */
    }

    > ${IconWrapper} {
        margin-left: ${({ theme }) => theme.space[1]}px;
    }
`;
