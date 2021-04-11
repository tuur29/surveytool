import styled, { css } from "styled-components";
import { Checkbox, Label, SliderWrapper, TextField } from "./Input";

export const Table = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template-columns: minmax(min-content, max-content) minmax(100px, max-content);
    grid-auto-rows: minmax(min-content, max-content);
    align-items: center;

    * {
        box-sizing: border-box;
    }
`;

export const TitleCell = styled.div`
    grid-column: 1;
    padding-right: ${({ theme }) => theme.space[3]}px;
    text-align: right;
    font-weight: bold;
`;

const surfacedCellStyles = css`
    grid-column: 2;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    text-align: center;
`;

export const HeadingCell = styled.div`
    ${surfacedCellStyles}
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.space[3]}px;
    font-weight: bold;
`;

// TODO: finish styling
export const InputCell = styled.div`
    ${surfacedCellStyles}

    ${TextField} {
        width: 100%;
    }

    ${Label} {
        height: 100%;
    }

    ${Checkbox} {
        font-size: 20px; /* To match fontsize of the other checkbox rendered in a h2 tag */
    }

    ${SliderWrapper} {
        margin: 0 ${({ theme }) => theme.space[3]}px;
    }
`;
