import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Result = styled.article<SpaceProps>`
    ${space};
    display: flex;
    justify-content: center;
`;

Result.defaultProps = {
    marginY: 4,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};

export const Title = styled.h2``;

export const Description = styled.div``;
