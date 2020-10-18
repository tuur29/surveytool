import styled from "styled-components";
import { messageTypes } from "../../types/Messages";
import { ColorType, getElevation } from "../../utils/theme";

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------

const MESSAGE_WIDTH = 450;

const backgroundColour: Record<messageTypes, ColorType> = {
    [messageTypes.error]: "messageError",
    [messageTypes.info]: "messageInfo",
    [messageTypes.neutral]: "messageNeutral",
};

const borderColour: Record<messageTypes, ColorType> = {
    [messageTypes.error]: "messageErrorBorder",
    [messageTypes.info]: "messageInfoBorder",
    [messageTypes.neutral]: "messageNeutralBorder",
};

export const textColour: Record<messageTypes, ColorType> = {
    [messageTypes.error]: "onMessageError",
    [messageTypes.info]: "onMessageInfo",
    [messageTypes.neutral]: "onMessageNeutral",
};

// ----------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------

export const Wrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndex.messages};
    padding: ${({ theme }) => theme.space[3]}px;
    max-width: ${MESSAGE_WIDTH}px;
`;

export const Message = styled.div<{ type: messageTypes | "neutral"; show: boolean }>`
    position: relative;
    right: ${({ theme, show }) => (show ? 0 : -MESSAGE_WIDTH - theme.space[3])}px;
    margin: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[2]}px;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme, type }) => theme.colors[backgroundColour[type]]};
    border: 1px solid ${({ theme, type }) => theme.colors[borderColour[type]]};
    border-radius: ${({ theme }) => theme.sizes.radius};
    color: ${({ theme, type }) => theme.colors[textColour[type]]};
    box-shadow: ${({ theme }) => getElevation(theme.elevation.message)};
    transition: right 0.3s;
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const Description = styled.div`
    font-size: 0.9em;
`;

export const DismissLabel = styled.div`
    font-size: 0.8em;
    text-align: center;
    cursor: pointer;
    margin: ${({ theme }) => -theme.space[2]}px 0;
`;

export const CloseButton = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.space[2]}px;
    right: ${({ theme }) => theme.space[2]}px;
    cursor: pointer;
`;
