import styled from "styled-components";
import { SpaceProps, space, WidthProps, width } from "styled-system";

export const Result = styled.article<SpaceProps>`
    ${space};
    display: flex;
    justify-content: center;
`;

Result.defaultProps = {
    marginY: 3,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};

export const Title = styled.h2``;

export const Description = styled.div<WidthProps>`
    ${width};
`;

Description.defaultProps = {
    width: { xs: 1, md: 0.75 },
};
