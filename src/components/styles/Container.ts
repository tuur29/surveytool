import styled from "styled-components";
import { SpaceProps, space, TextAlignProps, textAlign } from "styled-system";

export const Container = styled.div<SpaceProps>`
    max-width: ${({ theme }) => theme.breakpoints.xl};
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

export const Footer = styled(Container)<TextAlignProps>`
    font-size: ${({ theme }) => theme.sizes.footer};
    font-style: italic;
    ${textAlign};
`;
Footer.defaultProps = {
    marginY: 4,
    textAlign: { _: "center", md: "right" },
};
