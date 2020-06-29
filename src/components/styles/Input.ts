import styled, { css } from "styled-components";
import { IconWrapper } from "../../svg/Icon";

// ----------------------------------------------------------------------
// Checkbox
// ----------------------------------------------------------------------

// TODO: Convert checkbox
export const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: ${({ theme }) => theme.space[2]}px;
`;

// ----------------------------------------------------------------------
// Radio button
// ----------------------------------------------------------------------

export const RadioButton = styled.div<{ checked?: boolean }>`
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: ${({ theme }) => `${theme.space[1]}px ${theme.space[2]}px`};
    background-color: ${({ theme }) => theme.colors.controlBack};
    border-width: ${({ theme }) => theme.sizes.controlBorder};
    border-color: ${({ theme, checked }) => (checked ? theme.colors.controlBorderActive : theme.colors.controlBorder)};
    border-style: solid;
    border-radius: 100%;
    transition: border-color 0.3s;

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
    display: inline-flex;
    justify-content: space-between;
    min-width: 150px;
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    background-color: ${({ theme }) => theme.colors.controlBack};
    border-width: ${({ theme }) => theme.sizes.controlBorder};
    border-color: ${({ theme }) => theme.colors.controlBorder};
    border-style: solid;
    border-radius: ${({ theme }) => theme.sizes.radius};
    cursor: pointer;

    transition: border-radius 0.3s;

    ${({ opened }) =>
        opened &&
        css`
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;
        `};

    ${IconWrapper} {
        margin-left: ${({ theme }) => theme.space[2]}px;
    }
`;

export const SelectDropdown = styled.ul<{ show: boolean }>`
    position: absolute;
    display: block;
    min-width: 150px;
    margin: -2px 0 0 0;
    padding: 0;
    list-style: none;

    background-color: ${({ theme }) => theme.colors.controlBack};
    border-width: ${({ theme }) => theme.sizes.controlBorder};
    border-color: ${({ theme }) => theme.colors.controlBorder};
    border-style: solid;
    border-bottom-right-radius: ${({ theme }) => theme.sizes.radius};
    border-bottom-left-radius: ${({ theme }) => theme.sizes.radius};
    box-shadow: ${({ theme }) => theme.elevation[2]};

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
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    cursor: pointer;
    transition: background 0.3s;

    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.colors.controlBorder};
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.controlHover};
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
        ${RadioButton} {
            border-color: ${({ theme }) => theme.colors.controlBorderHover};
        }
    }
`;
