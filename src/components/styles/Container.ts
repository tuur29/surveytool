import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Container = styled.div<SpaceProps>`
    max-width: ${({ theme }) => theme.breakpoints.xl};
    ${space};
`;
Container.defaultProps = {
    marginX: "auto",
    paddingX: { _: 1, sm: 1, md: 2, lg: 3 },
};
