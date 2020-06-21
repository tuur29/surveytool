import styled from "styled-components";

const TOOLTIP_BOUNDS_SIZE = 25;

// TODO: improve dynamic positioning
export const Tooltip = styled.span`
    &::before {
        content: "";
        position: absolute;
        display: inline-block;
        padding: ${TOOLTIP_BOUNDS_SIZE}px;
        margin-top: -${TOOLTIP_BOUNDS_SIZE / 2}px;
        margin-left: -${TOOLTIP_BOUNDS_SIZE / 2}px;
    }

    span {
        position: absolute;
        opacity: 0;
        background: ${({ theme }) => theme.colors.backSoft};
        color: ${({ theme }) => theme.colors.foreSoft};
        box-shadow: 3px 3px 6px ${({ theme }) => theme.colors.foreShadow};
        padding: 10px 15px;
        border-radius: 4px;
        transition: opacity 0.3s;
        transition-delay: 0.5s;
        pointer-events: none;
    }

    &:hover {
        span {
            opacity: 1;
            transition-delay: 0s;
        }
    }
`;
