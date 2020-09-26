import styled from "styled-components";
import { SpaceProps, space, TextAlignProps, textAlign } from "styled-system";
import { BreakpointType } from "../../utils/theme";

export const Container = styled.div<SpaceProps & { maxBreakpoint?: BreakpointType }>`
    max-width: ${({ theme, maxBreakpoint }) => theme.breakpoints[maxBreakpoint || "xl"]};
    ${space};
`;
Container.defaultProps = {
    marginX: "auto",
    paddingX: { xs: 0, sm: 2, lg: 3 },
};

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.sizes.title};
    text-align: center;
`;

export const Description = styled.div<SpaceProps>`
    ${space};
`;
Description.defaultProps = {
    paddingX: { xs: 2, lg: 5 },
};

export const Footer = styled(Container)<TextAlignProps>`
    font-size: ${({ theme }) => theme.sizes.footer};
    font-style: italic;
    ${textAlign};
`;
Footer.defaultProps = {
    marginY: 4,
    textAlign: { _: "center", md: "right" },
};
