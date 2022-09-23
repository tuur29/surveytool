import styled, { css } from "styled-components";
import { resultAnimationTotalFrames, resultAnimationFrameLength } from "../../utils/utils";

export const Wrapper = styled.div`
    position: relative;
    width: ${({ theme }) => theme.sizes.scoreCounterSize};
    height: ${({ theme }) => theme.sizes.scoreCounterSize};
    overflow: hidden;
`;

type DialType = {
    angle: number;
    enableAnimation?: boolean;
    type: "filled" | "empty";
};

export const GenericDial = styled.div<DialType>`
    position: absolute;
    width: ${({ theme }) => `calc( ${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2 )`};
    height: ${({ theme }) => `calc( ${theme.sizes.scoreCounterSize} - ${theme.sizes.scoreCounterThickness} * 2 )`};
    transform: rotate(${({ angle }) => angle}deg);
    border-radius: 50%;
    border: ${({ theme }) => theme.sizes.scoreCounterThickness} solid transparent;
    border-bottom-color: ${({ type, theme }) =>
        type === "filled" ? theme.colors.scoreCounterFront : theme.colors.scoreCounterBack};

    ${({ enableAnimation }) =>
        enableAnimation &&
        css`
            transition: transform ${resultAnimationTotalFrames * resultAnimationFrameLength}ms ease-in-out;
        `}
`;

const borderOffset = 2; // necessary to mask css pixel imperfect rotations

export const MaskDial = styled.div`
    position: absolute;
    width: ${({ theme }) =>
        `calc( ${theme.sizes.scoreCounterSize} - (${theme.sizes.scoreCounterThickness} + ${borderOffset}px) * 2)`};
    height: ${({ theme }) =>
        `calc( ${theme.sizes.scoreCounterSize} - (${theme.sizes.scoreCounterThickness} + ${borderOffset}px) * 2)`};
    left: -${borderOffset}px;
    top: -${borderOffset}px;
    border: ${({ theme }) => `calc( ${theme.sizes.scoreCounterThickness} + ${borderOffset}px * 2)`} solid transparent;
    border-bottom-color: ${({ theme }) => theme.colors.back};
    border-radius: 50%;
`;

export const Counter = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: lighter;
    font-size: ${({ theme }) => theme.sizes.scoreCounterTextSize};
`;
