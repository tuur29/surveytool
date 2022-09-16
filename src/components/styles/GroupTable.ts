import styled, { css } from "styled-components";
import { BottomLabel, Checkbox, RadioButton, RadioListWrapper, SliderWrapper, TextField } from "./Input";

export const Table = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: minmax(min-content, max-content) minmax(100px, max-content);
    grid-auto-rows: minmax(min-content, max-content);
    justify-content: center;

    * {
        box-sizing: border-box;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: block;
    }
`;

export const TitleCell = styled.div`
    grid-column: 1;
    padding-top: ${({ theme }) => theme.space[3]}px;
    padding-right: ${({ theme }) => theme.space[3]}px;
    text-align: right;
    font-family: ${({ theme }) => theme.fonts.question};
    font-weight: bold;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        text-align: left;
    }
`;

const surfacedCellStyles = css`
    grid-column: 2;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
`;

export const HeadingCell = styled.div`
    ${surfacedCellStyles}
    display: flex;
    justify-content: stretch;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.space[2]}px;
    font-weight: bold;
    text-align: center;

    > div {
        flex-grow: 1;
        flex-basis: 0;
    }
`;

export const InputCell = styled.div<{ isRadioButtonSlider?: boolean; accentColor?: string }>`
    ${surfacedCellStyles}

    ${({ accentColor, theme }) =>
        accentColor &&
        css`
            padding-left: 28px;

            @media (min-width: ${theme.breakpoints.md}) {
                &:before {
                    content: " ";
                    display: block;
                    float: left;
                    width: 4px;
                    height: 100%;
                    margin-left: -8px;
                    background: ${accentColor};
                    border-radius: ${theme.sizes.radius};
                }
            }
        `};

    ${({ isRadioButtonSlider: includeMargin, theme }) =>
        !includeMargin
            ? css`
                  padding: ${theme.space[2]}px ${theme.space[3]}px;
              `
            : ""}

    > * {
        margin: 0 ${({ theme, isRadioButtonSlider: includeMargin }) => (includeMargin ? theme.space[3] : 0)}px;
    }

    ${TextField} {
        width: calc(100% - ${({ theme, isRadioButtonSlider: includeMargin }) =>
            includeMargin ? theme.space[3] * 2 : 0}px);
    }

    ${Checkbox}, ${RadioButton} {
        font-size: 20px; /* To match fontsize of the other checkbox rendered in a h2 tag */
    }

    ${SliderWrapper} {
        margin: 0 26px; /* Pixel perfect, I promise :) */
    }

    ${RadioListWrapper} {
        justify-content: space-around;
        gap: ${({ theme }) => theme.space[2]}px;
        margin-top: 0;
    }

    ${BottomLabel} > div:not(${RadioButton}) {
        display: none;
    }
`;
