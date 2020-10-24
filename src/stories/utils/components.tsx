import styled from "styled-components";

export const ColorSwatch = styled.div<{ value: string; name?: string; size?: number }>`
    position: relative;
    display: inline-block;
    width: ${({ size }) => size || 20}px;
    height: ${({ size }) => size || 20}px;
    margin: 8px;
    background-color: ${({ value }) => value || "grey"};
    border: ${({ size }) => (size || 20) / 10}px solid white;
    border-radius: 4px;
    box-shadow: 0 0 3px grey;
    vertical-align: middle;

    &:hover::before {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: ${({ size }) => (size || 20) * 1.5}px;
        display: block;
        content: "${({ value, name }) => (name ? `${name} ${value}` : value)}";
        padding: 8px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 0 3px grey;
        transform: translateY(-50%);
    }
`;
