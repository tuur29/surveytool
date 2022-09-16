import styled, { css } from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Result = styled.article<SpaceProps & { halfWidth?: boolean }>`
    ${space};
    display: flex;
    justify-content: center;

    ${({ halfWidth, theme }) =>
        halfWidth &&
        css`
            @media (min-width: ${theme.breakpoints.md}) {
                display: inline-flex;
                width: 50%;
                box-sizing: border-box;
            }
        `};
`;

Result.defaultProps = {
    marginY: 3,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};
