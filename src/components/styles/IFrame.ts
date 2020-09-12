import styled from "styled-components";
import { height, HeightProps } from "styled-system";

export const IFrame = styled.iframe<HeightProps>`
    width: 100%;
    border: none;
    ${height}
`;
