import styled, { css } from "styled-components";
import { SpaceProps, space, TextAlignProps, textAlign } from "styled-system";
import { BreakpointType } from "../../utils/theme";
import { ImageWrapper } from "./Image";
import { Question } from "./Question";

export const Container = styled.div<SpaceProps & { maxBreakpoint?: BreakpointType }>`
    max-width: ${({ theme, maxBreakpoint }) => theme.breakpoints[maxBreakpoint || "xl"]};
    ${space};
`;
Container.defaultProps = {
    marginX: "auto",
    paddingX: { xs: 0, sm: 2, lg: 3 },
};

export const Line = styled.hr`
    display: none;
    margin: ${({ theme }) => theme.space[5]}px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.separator};
`;

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.sizes.title};
    font-family: ${({ theme }) => theme.fonts.title};
    text-align: center;
`;

export const Description = styled.div<SpaceProps>`
    font-family: ${({ theme }) => theme.fonts.description};
    white-space: pre-wrap;
    ${space};
`;
Description.defaultProps = {
    paddingX: { xs: 2, lg: 5 },
};

export const Group = styled.div<{ showSeparator?: boolean; accentColor?: string; questionBackgroundColor?: string }>`
    ${({ theme, showSeparator }) =>
        showSeparator &&
        css`
            ${Line} {
                display: block;
            }

            ${Description} {
                padding-left: 0;
                padding-right: 0;
            }

            ${ImageWrapper} {
                margin: -${theme.space[3]}px;
                margin-bottom: ${theme.space[3]}px;
                padding: 0 ${theme.space[5]}px;
            }
        `}

    ${Question} {
        ${({ accentColor }) =>
            accentColor
                ? css`
                      border-left: 6px solid ${accentColor};
                  `
                : ""};

        ${({ questionBackgroundColor }) =>
            questionBackgroundColor
                ? css`
                      background-color: ${questionBackgroundColor};
                  `
                : ""};
    }
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
