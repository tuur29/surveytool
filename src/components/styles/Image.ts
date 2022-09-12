import styled, { css } from "styled-components";
import { ImageType } from "../../types/CommonTypes";

export const imageAlignmentStyles = css<{ imagePosition?: ImageType["alignment"] }>`
    ${({ imagePosition, theme }) =>
        imagePosition &&
        css`
            display: flex;
            flex-direction: ${imagePosition === "right" ? "row" : "column"};
            justify-content: space-between;

            > ${Image} {
                align-self: ${imagePosition === "left" ? "flex-start" : "center"};
                margin-top: ${imagePosition === "right" ? 0 : theme.space[3]}px;
                margin-left: ${imagePosition === "right" ? theme.space[4] : 0}px;
            }
        `};
`;

export const ImageWrapper = styled.div<{ imagePosition?: ImageType["alignment"] }>`
    ${imageAlignmentStyles};
`;

export const Image = styled.img<{ widthPercentage?: number }>`
    width: ${({ widthPercentage }) => (widthPercentage ? `${widthPercentage * 100}%` : "")};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        max-width: 100%;
        width: unset;
    }
`;
