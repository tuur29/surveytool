import styled from "styled-components";
import { SpaceProps, space } from "styled-system";
import { getElevation } from "../../utils/theme";

export const Question = styled.article<SpaceProps>`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    box-shadow: ${getElevation(1)};
    border-radius: ${({ theme }) => theme.sizes.radius};
    ${space};
`;

Question.defaultProps = {
    marginY: 4,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};

export const Title = styled.h2`
    font-weight: normal;
    font-size: ${({ theme }) => theme.sizes.subtitle};
    margin: ${({ theme }) => theme.space[3]}px 0;
`;

export const ErrorPanel = styled.div`
    margin-top: ${({ theme }) => theme.space[4]}px;
    padding-top: ${({ theme }) => theme.space[3]}px;
    border-top: 1px solid ${({ theme }) => theme.colors.separator};

    p {
        text-align: center;
    }
`;

export const ErrorList = styled.ul`
    li {
        color: ${({ theme }) => theme.colors.error};
        cursor: pointer;
    }
`;
