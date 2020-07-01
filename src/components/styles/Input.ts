import styled, { css } from "styled-components";
import { IconWrapper } from "../common/Icon";
import { getElevation } from "../../utils/theme";

const baseColors = css`
    background-color: ${({ theme }) => theme.colors.controlBack};
    border-width: ${({ theme }) => theme.sizes.controlBorder};
    border-color: ${({ theme }) => theme.colors.controlBorder};
    border-style: solid;
    transition: border 0.3s;
    outline: none;
`;

const baseMargin = css`
    margin-top: ${({ theme }) => theme.space[1]}px;
    margin-right: ${({ theme }) => theme.space[2]}px;
    margin-bottom: ${({ theme }) => theme.space[1]}px;
    margin-left: 0;
`;

const basePadding = css`
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
`;

// ----------------------------------------------------------------------
// Checkbox
// ----------------------------------------------------------------------

export const Checkbox = styled.div<{ checked?: boolean }>`
    ${baseColors};
    ${baseMargin};
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    border-color: ${({ theme, checked }) => (checked ? theme.colors.controlBorderActive : theme.colors.controlBorder)};
    border-radius: ${({ theme }) => theme.sizes.radius};
    overflow: hidden;

    &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        left: ${({ checked }) => (checked ? 100 : 0)}%;
        bottom: 0;
        z-index: 1;
        background-color: ${({ theme }) => theme.colors.controlBack};
        transition: left 0.3s;
    }

    svg {
        width: calc(100% - (2px * 2));
        height: calc(100% - (2px * 2));
        margin: 2px;
        color: ${({ theme }) => theme.colors.controlHighlight};
        vertical-align: super;
    }
`;

// ----------------------------------------------------------------------
// Radio button
// ----------------------------------------------------------------------

export const RadioButton = styled.div<{ checked?: boolean }>`
    ${baseColors};
    ${baseMargin};
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    border-color: ${({ theme, checked }) => (checked ? theme.colors.controlBorderActive : theme.colors.controlBorder)};
    border-radius: 100%;

    &::before {
        content: "";
        display: inline-block;
        position: absolute;
        ${({ theme }) => css`
            top: ${theme.sizes.controlValueOffset};
            right: ${theme.sizes.controlValueOffset};
            bottom: ${theme.sizes.controlValueOffset};
            left: ${theme.sizes.controlValueOffset};
        `};
        border-radius: 100%;
        background-color: ${({ theme }) => theme.colors.controlHighlight};

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

export const SelectValue = styled.div<{ opened?: boolean }>`
    ${baseColors};
    ${baseMargin};
    ${basePadding};
    position: relative;
    z-index: 1; /* necessary to hide dropdown animation */

    display: inline-flex;
    justify-content: space-between;
    min-width: 150px;
    border-radius: ${({ theme }) => theme.sizes.radius};
    cursor: pointer;

    ${({ opened }) =>
        opened &&
        css`
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;

            svg {
                color: ${({ theme }) => theme.colors.controlBorderActive};
            }
        `};

    ${({ opened }) =>
        !opened &&
        css`
            &:hover {
                border-color: ${({ theme }) => theme.colors.controlBorderHover};
            }

            &:hover svg {
                color: ${({ theme }) => theme.colors.controlBorderHover};
            }
        `};

    ${IconWrapper} {
        margin-left: ${({ theme }) => theme.space[2]}px;
    }
`;

export const SelectDropdown = styled.ul<{ show: boolean }>`
    ${baseColors}
    position: absolute;
    display: block;
    min-width: 150px;
    margin: 0;
    margin-top: calc(-1 * (${({ theme }) => theme.space[1]}px + ${({ theme }) => theme.sizes.controlBorder}));
    padding: 0;
    list-style: none;
    border-bottom-right-radius: ${({ theme }) => theme.sizes.radius};
    border-bottom-left-radius: ${({ theme }) => theme.sizes.radius};
    box-shadow: ${getElevation(2)};

    /* animation */
    transform-origin: top;
    transition: opacity 0.3s, transform 0.3s;
    ${({ show, theme }) => css`
        opacity: ${show ? 1 : 0};
        pointer-events: ${show ? "initial" : "none"};
        transform: translateY(${show ? 0 : -theme.space[2]}px);
    `};
`;

export const SelectOption = styled.li`
    ${basePadding};
    cursor: pointer;
    transition: background 0.3s;

    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.colors.controlBorder};
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.controlBackHover};
    }
`;

// ----------------------------------------------------------------------
// Shared Label
// ----------------------------------------------------------------------

export const Label = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;

    &:hover {
        ${RadioButton}, ${Checkbox} {
            border-color: ${({ theme }) => theme.colors.controlBorderHover};
        }
    }
`;

// ----------------------------------------------------------------------
// Text
// ----------------------------------------------------------------------

export const TextField = styled.input`
    ${baseColors};
    ${baseMargin};
    ${basePadding};
    border-radius: ${({ theme }) => theme.sizes.radius};

    &:hover,
    &:focus,
    &:active {
        border-color: ${({ theme }) => theme.colors.controlBorderHover};
    }

    &:not([value=""]) {
        border-color: ${({ theme }) => theme.colors.controlBorderActive};
    }

    ::placeholder {
        color: ${({ theme }) => theme.colors.controlBorder};
    }
`;

export const FieldError = styled.div`
    min-height: 1.5em;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.sizes.controlError};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.error};

    ${IconWrapper} {
        margin-right: 0.5em;
        max-height: 100%;
    }
`;
