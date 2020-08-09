import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ width: number; height: number }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`;

export const Mask = styled.div<{ borderPercentage: number }>`
    position: absolute;
    top: ${({ borderPercentage }) => borderPercentage}%;
    left: ${({ borderPercentage }) => borderPercentage}%;
    width: ${({ borderPercentage }) => 100 - borderPercentage * 2}%;
    height: ${({ borderPercentage }) => 100 - borderPercentage * 2}%;
    background: ${({ theme }) => theme.colors.back};
    border-radius: 50%;
`;

// TODO: make customizable via theme
// TODO: improve dial animation (also make gap customizable)
export const Dial = styled.div<{ value: number; min: number; max: number }>`
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(225deg);
    border-radius: 50%;
    width: 100%;
    height: 100%;

    ${({ theme, value, min, max }) => css`
        --angle: ${((value - min) / (max - min)) * (360 - 90)}deg;
        background: conic-gradient(
            ${theme.colors.primary} 0deg,
            ${theme.colors.primary} var(--angle),
            ${theme.colors.controlBorder} var(--angle),
            ${theme.colors.controlBorder} 270deg,
            ${theme.colors.back} 270deg
        );
    `};
`;

export const Counter = styled.div`
    font-weight: lighter;
    font-size: 2.8em;
    z-index: 1;
`;
