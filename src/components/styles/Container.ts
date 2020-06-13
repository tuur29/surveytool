import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Container = styled.div<SpaceProps>`
    max-width: ${({theme}) => theme.breakpoints.xl};
    ${space};
`;

Container.defaultProps = {
    marginX: {_: 0, sm: 1, lg: 3, xl: "auto"},
}
