import styled from "styled-components";
import { display, DisplayProps } from "styled-system";

// TODO: decide styling way
// .attrs({ display: { xs: "block", lg: "none" } })
export const List = styled.ul<DisplayProps>`
    margin-left: 0;
    ${display}
`;
// List.defaultProps = {
//     display: { xs: "block", lg: "none" },
// };

export const ListItem = styled.li`
    color: ${({ theme }) => theme.breakpoints};
`;
