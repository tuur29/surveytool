import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Question = styled.article<SpaceProps>`
    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.colors.backSoft};
    }
    ${space};
`;
Question.defaultProps = {
    marginY: 3,
    paddingY: 3,
    paddingX: { lg: 3 },
};

export const Title = styled.h2`
    font-weight: normal;
    font-size: 18px;
`;
