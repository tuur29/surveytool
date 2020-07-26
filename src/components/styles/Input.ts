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
        top: 0;
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

export const RadioListWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
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

    > * > svg {
        margin-left: ${({ theme }) => theme.space[2]}px;
    }

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

export const BottomLabel = styled(Label)`
    flex-direction: column;
    justify-content: end;
    text-align: center;
    margin-top: ${({ theme }) => theme.space[2]}px;
    margin-right: ${({ theme }) => theme.space[4]}px;
    color: ${({ theme }) => theme.colors.controlTick};

    ${RadioButton}, ${Checkbox} {
        margin-right: 0;
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
    color: ${({ theme }) => theme.colors.onSurface};

    &:hover,
    &:focus,
    &:active {
        border-color: ${({ theme }) => theme.colors.controlBorderHover};
    }

    &:not([value=""]) {
        border-color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.controlBorderActive)};
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.controlPlaceholder};
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

const sliderTransition = css`
    transition: all 0.15s;
`;

export const SliderWrapper = styled.div<{ width?: number }>`
    > div {
        position: relative;
        width: ${({ width }) => width || 300}px;
        height: 30px;
        margin-bottom: ${({ theme }) => theme.space[3]}px;
        user-select: none;
    }
`;

export const SliderRail = styled.div`
    position: absolute;
    top: calc(50% - (${({ theme }) => theme.sizes.controlSliderRailHeight} / 2));
    width: 100%;
    height: ${({ theme }) => theme.sizes.controlSliderRailHeight};
    border-radius: ${({ theme }) => theme.sizes.radius};
    background-color: ${({ theme }) => theme.colors.controlSliderBack};
`;

export const SliderTrack = styled.div<{ percent: number }>`
    position: absolute;
    z-index: 1;
    top: calc(50% - (${({ theme }) => theme.sizes.controlSliderTrackHeight} / 2));
    left: 0;
    right: ${({ percent }) => 100 - percent}%;
    height: ${({ theme }) => theme.sizes.controlSliderTrackHeight};
    width: unset;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ percent, theme }) => (percent === 100 ? theme.sizes.radius : "initial")};
    border-top-left-radius: ${({ theme }) => theme.sizes.radius};
    border-bottom-left-radius: ${({ theme }) => theme.sizes.radius};

    ${sliderTransition};
`;

export const SliderHandle = styled.div<{ percent: number }>`
    position: absolute;
    z-index: 2;
    top: calc(50% - (${({ theme }) => theme.sizes.controlSliderHandleSize} / 2));
    left: ${({ percent }) => percent}%;
    display: flex;
    width: ${({ theme }) => theme.sizes.controlSliderHandleSize};
    height: ${({ theme }) => theme.sizes.controlSliderHandleSize};
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.controlHighlight};
    border-radius: 100%;
    transform: translateX(-50%); /* pick center as handle reference point */
    cursor: move;

    &:hover,
    &:focus,
    &:active {
        background-color: ${({ theme }) => theme.colors.controlHighlightActive};
    }

    ${sliderTransition};
`;

export const SliderTick = styled.div<{ percent: number }>`
    position: absolute;
    top: calc(50% - (${({ theme }) => theme.sizes.controlSliderTrackHeight} / 2));
    left: ${({ percent }) => percent}%;
    width: 2px;
    height: ${({ theme }) => theme.sizes.controlSliderTrackHeight};
    background-color: ${({ theme }) => theme.colors.controlSliderBack};

    &:first-of-type,
    &:last-of-type {
        display: none;
    }
`;

export const SliderTickLabel = styled.span<{ percent: number }>`
    position: absolute;
    top: 100%;
    left: ${({ percent }) => percent}%;
    color: ${({ theme }) => theme.colors.controlTick};
    transform: translateX(-50%); /* pick center as tick reference point */
`;
