import styled from "styled-components";
import { width, WidthProps } from "styled-system";

export const IFrame = styled.iframe<WidthProps>`
    width: 100%;
    border: none;
    ${width}
`;
