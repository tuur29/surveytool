import styled, { css } from "styled-components";
import { ImageType } from "../../types/CommonTypes";

export const imageAlignmentStyles = css<{ imagePosition?: ImageType["alignment"] }>`
    ${({ imagePosition }) =>
        imagePosition &&
        css`
            display: flex;
            flex-direction: ${imagePosition === "right" ? "row" : "column"};
            justify-content: space-between;

            > ${Image} {
                align-self: ${imagePosition === "left" ? "flex-start" : "center"};
                margin-top: ${({ theme }) => (imagePosition === "right" ? 0 : theme.space[3])}px;
                margin-left: ${({ theme }) => (imagePosition === "right" ? theme.space[4] : 0)}px;
            }
        `};
`;

export const ImageWrapper = styled.div<{ imagePosition?: ImageType["alignment"] }>`
    ${imageAlignmentStyles};
`;

export const Image = styled.img<{ widthPercentage?: number }>`
    ${({ widthPercentage }) =>
        widthPercentage
            ? css`
                  width: ${widthPercentage * 100}%;
              `
            : ""}
`;
