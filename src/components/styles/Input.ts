import styled, { css } from "styled-components";
import { IconWrapper } from "../../svg/Icon";

const RADIO_BULLET_OFFSET = 15;

export const Label = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: ${({ theme }) => theme.space[2]}px;
`;

export const RadioButton = styled.div<{ checked?: boolean }>`
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 4px 6px 0 3px;
    border: 1px solid ${({ theme }) => theme.colors.foreSoft};
    border-radius: 100%;

    &::before {
        content: "";
        display: inline-block;
        position: absolute;
        top: ${RADIO_BULLET_OFFSET}%;
        right: ${RADIO_BULLET_OFFSET}%;
        bottom: ${RADIO_BULLET_OFFSET}%;
        left: ${RADIO_BULLET_OFFSET}%;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.colors.primary};

        /* animation */
        transition: opacity 0.3s, transform 0.3s;
        transform-origin: center;
        ${({ checked }) => css`
            opacity: ${checked ? 1 : 0};
            transform: scale(${checked ? 1 : 0.35});
        `};
    }
`;

// ----------------------------------------------------------------------
// Select
// ----------------------------------------------------------------------

export const SelectWrapper = styled.div`
    * {
        box-sizing: border-box;
        user-select: none;
    }
`;

export const SelectValue = styled.div`
    display: inline-flex;
    justify-content: space-between;
    min-width: 150px;
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    border: 1px solid ${({ theme }) => theme.colors.foreSoft};
    cursor: pointer;

    ${IconWrapper} {
        margin-left: ${({ theme }) => theme.space[2]}px;
    }
`;

export const SelectDropdown = styled.ul<{ show: boolean }>`
    position: absolute;
    display: block;
    min-width: 150px;
    margin: -1px 0 0 0;
    padding: 0;
    list-style: none;
    background: ${({ theme }) => theme.colors.back};
    border: 1px solid ${({ theme }) => theme.colors.foreSoft};

    /* animation */
    transform-origin: top;
    transition: opacity 0.3s, transform 0.3s;
    ${({ show }) => css`
        opacity: ${show ? 1 : 0};
        pointer-events: ${show ? "initial" : "none"};
        transform: scaleY(${show ? 1 : 0.85});
    `};
`;

export const SelectOption = styled.li`
    margin: 0;
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    cursor: pointer;

    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.colors.foreSoft};
    }
`;
