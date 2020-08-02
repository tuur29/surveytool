import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Result = styled.article<SpaceProps>`
    ${space};
`;

Result.defaultProps = {
    marginY: 3,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};

export const Title = styled.h2`
    text-align: center;
`;

export const Description = styled.div`
    text-align: center;
`;

