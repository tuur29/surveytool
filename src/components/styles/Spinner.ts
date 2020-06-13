import styled, { keyframes } from "styled-components";

const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div<{ size?: number }>`
    width: ${({ size }) => size || 50}px;
    height: ${({ size }) => size || 50}px;
    border-radius: 50%;
    background-color: transparent;
    border-style: solid;
    border-width: ${({ size }) => (size|| 50) / 12.5}px;
    border-color: ${({ theme }) => theme.colors.backSoft};
    border-top-color: ${({ theme }) => theme.colors.primary};
    animation: 1s ${animation} linear infinite;
`;

export const CenterWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;
