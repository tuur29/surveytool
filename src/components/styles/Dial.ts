import styled from "styled-components";
import { resultAnimationTotalFrames, resultAnimationFrameLength } from "../../utils/utils";

export const Wrapper = styled.div<{ size: number }>`
    position: relative;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size / 2}px;
    overflow: hidden;
`;

const borderSize = 20;
export const Dial = styled.div<{ size: number; angle: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ size }) => size - borderSize * 2}px;
    height: ${({ size }) => size - borderSize * 2}px;
    border: ${borderSize}px solid #e8e8e8;
    border-radius: 50%;
    transition: transform ${resultAnimationTotalFrames * resultAnimationFrameLength}ms ease-in-out;
    transform: rotate(${({ angle }) => angle}deg);

    &::before {
        content: "";
        position: absolute;
        width: ${({ size }) => size - borderSize * 2}px;
        height: ${({ size }) => size - borderSize * 2}px;
        left: -${borderSize}px;
        top: -${borderSize}px;
        border: ${borderSize}px solid #bc302b;
        border-top-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        transform: rotate(45deg);
    }
`;

export const Counter = styled.div<{ size: number }>`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    font-weight: lighter;
    font-size: 2.8em;
`;
