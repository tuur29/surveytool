import styled, { css } from "styled-components";
import { IconWrapper } from "../common/Icon";
import { getElevation } from "../../utils/theme";
import { SliderDirectionType } from "../../types/ConfigTypes";

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

    /* Invisible placeholder in front of checkmark icon to make check animation */
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

    /* Check icon */
    svg {
        width: calc(100% - (${({ theme }) => theme.sizes.controlCheckOffset} * 2));
        height: calc(100% - (${({ theme }) => theme.sizes.controlCheckOffset} * 2));
        margin: ${({ theme }) => theme.sizes.controlCheckOffset};
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

    /* Coloured bullet */
    &::before {
        content: "";
        display: inline-block;
        position: absolute;
        ${({ theme }) => css`
            top: ${theme.sizes.controlRadioOffset};
            right: ${theme.sizes.controlRadioOffset};
            bottom: ${theme.sizes.controlRadioOffset};
            left: ${theme.sizes.controlRadioOffset};
        `};
        border-radius: 50%;
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
        !opened && // default, not opened styles
        css`
            &:hover {
                border-color: ${({ theme }) => theme.colors.controlBorderHover};
            }

            &:hover > * > svg {
                color: ${({ theme }) => theme.colors.controlBorderHover};
            }
        `};

    ${({ opened }) =>
        opened && // opened styles
        css`
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;

            > * > svg {
                color: ${({ theme }) => theme.colors.controlBorderActive};
            }
        `};
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

export const TextField = styled.input<{ isError?: boolean }>`
    ${baseColors};
    ${baseMargin};
    ${basePadding};
    border-radius: ${({ theme }) => theme.sizes.radius};
    color: ${({ theme }) => theme.colors.onBack};

    &:hover,
    &:focus,
    &:active {
        border-color: ${({ theme }) => theme.colors.controlBorderHover};
    }

    &:not([value=""]) {
        border-color: ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.controlBorderActive};
    }

    /* TODO: fix test placeholder color in darkmode */
    &::placeholder {
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

// ----------------------------------------------------------------------
// Slider
// ----------------------------------------------------------------------

export const SliderWrapper = styled.div<{ width?: number }>`
    position: relative;
    width: ${({ width }) => width || 300}px;
    height: 30px;
    background: green;
    user-select: none;
`;

export const SliderTrack = styled.div<{ percentage: number; direction?: SliderDirectionType }>`
    position: absolute;
    top: calc(50% - 1.5px);
    width: 100%;
    height: 3px;
    border-radius: 1px;
    background-color: red;
`;

export const SliderHandle = styled.div<{ percentage: number; direction?: SliderDirectionType }>`
    position: absolute;
    top: 20%;
    left: ${({ percentage }) => percentage}%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: middle;
    background-color: red;
    border-radius: 100%;
`;

export const SliderHandleLabel = styled.span`
    color: white;
    font-size: 14px;
`;

export const SliderLabel = styled.span<{ location: "left" | "right" }>`
    position: absolute;
    top: 15%;
    left: ${({ location }) => (location === "left" ? -5 : 105)}%;
    color: black;
`;

export const SliderMark = styled.div<{ percentage: number; direction?: SliderDirectionType }>`
    position: absolute;
    top: 30%;
    width: 2px;
    height: 40%;
    background-color: red;

    ${({ direction, percentage }) =>
        css`
            ${direction === "toLeft" ? "right" : "left"}: ${percentage}%
        `};
`;