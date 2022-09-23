import styled, { css } from "styled-components";
import { resultAnimationTotalFrames, resultAnimationFrameLength } from "../../utils/utils";

export const Wrapper = styled.div`
    position: relative;
    width: ${({ theme }) => theme.sizes.scoreCounterSize};
    height: calc(${({ theme }) => theme.sizes.scoreCounterSize} / 2);
    overflow: hidden;
`;

export const Dial = styled.div<{ angle: number; enableAnimation?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ theme }) => `calc(${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2)`};
    height: ${({ theme }) => `calc(${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2)`};
    border: ${({ theme }) => `${theme.sizes.scoreCounterThickness} solid ${theme.colors.scoreCounterBack}`};
    border-radius: 50%;
    transform: rotate(${({ angle }) => angle}deg);

    ${({ enableAnimation }) =>
        enableAnimation &&
        css`
            transition: transform ${resultAnimationTotalFrames * resultAnimationFrameLength}ms ease-in-out;
        `}

    &::before {
        content: "";
        position: absolute;
        width: ${({ theme }) => `calc(${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2)`};
        height: ${({ theme }) => `calc(${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2)`};
        left: -${({ theme }) => theme.sizes.scoreCounterThickness};
        top: -${({ theme }) => theme.sizes.scoreCounterThickness};
        border: ${({ theme }) => `${theme.sizes.scoreCounterThickness} solid ${theme.colors.scoreCounterFront}`};
        border-top-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        transform: rotate(45deg);
    }
`;

export const Counter = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    font-weight: lighter;
    font-size: ${({ theme }) => theme.sizes.scoreCounterTextSize};
`;
