import styled, { keyframes } from "styled-components";
import { SpaceProps, space } from "styled-system";

const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.div<SpaceProps & { size?: number }>`
    width: ${({ size }) => size || 50}px;
    height: ${({ size }) => size || 50}px;
    border-radius: 50%;
    background-color: transparent;
    border-style: solid;
    border-width: ${({ size }) => (size || 50) / 12.5}px;
    border-color: transparent;
    border-top-color: ${({ theme }) => theme.colors.spinner};
    animation: 1s ${animation} linear infinite;

    ${space};
`;

export const CenterWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;
