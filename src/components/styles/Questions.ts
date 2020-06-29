import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Question = styled.article<SpaceProps>`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    box-shadow: ${({ theme }) => theme.elevation[1]};
    border-radius: ${({ theme }) => theme.sizes.radius};
    ${space};
`;

Question.defaultProps = {
    marginY: 4,
    paddingY: 3,
    paddingX: { lg: 4 },
};

export const Title = styled.h2`
    font-weight: normal;
    font-size: ${({ theme }) => theme.sizes.questionTitle};
    margin: ${({ theme }) => theme.space[3]}px 0;
`;
