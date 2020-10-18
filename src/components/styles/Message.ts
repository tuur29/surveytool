import styled from "styled-components";
import { getElevation } from "../../utils/theme";

export const Wrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndex.messages};
    padding: ${({ theme }) => theme.space[3]}px;
    max-width: 450px;
`;

export const Message = styled.div<{ type: "info" | "error" }>`
    position: relative;
    margin: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[2]}px;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme, type }) => theme.colors[type === "info" ? "messageInfo" : "messageError"]};
    border: 1px solid ${({ theme, type }) => theme.colors[type === "info" ? "messageInfoBorder" : "messageErrorBorder"]};
    border-radius: ${({ theme }) => theme.sizes.radius};
    color: ${({ theme, type }) => theme.colors[type === "info" ? "onMessageInfo" : "onMessageError"]};
    box-shadow: ${({ theme }) => getElevation(theme.elevation.message)};
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const Description = styled.div`
    font-size: 0.9em;
`;

export const CloseButton = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.space[2]}px;
    right: ${({ theme }) => theme.space[2]}px;
    cursor: pointer;
`;
