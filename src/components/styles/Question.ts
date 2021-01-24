import styled, { css } from "styled-components";
import { SpaceProps, space } from "styled-system";
import { ImageType } from "../../types/QuestionTypes";
import { getElevation } from "../../utils/theme";

export const Image = styled.img<{ widthPercentage?: number }>`
    ${({ widthPercentage }) =>
        widthPercentage
            ? css`
                  width: ${widthPercentage * 100}%;
              `
            : css`
                  flex-grow: 1;
              `};
`;

export const Question = styled.article<SpaceProps & { imagePosition?: ImageType["alignment"] }>`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    box-shadow: ${({ theme }) => getElevation(theme.elevation.question)};
    border-radius: ${({ theme }) => theme.sizes.radius};
    ${space};

    ${({ imagePosition }) =>
        imagePosition &&
        css`
            display: flex;
            flex-direction: ${imagePosition === "right" ? "row-reverse" : "column"};
            justify-content: space-between;

            ${Image} {
                align-self: ${imagePosition === "center" ? "center" : "unset"};
                margin-left: ${({ theme }) => (imagePosition === "right" ? theme.space[4] : 0)}px;
            }
        `};
`;

Question.defaultProps = {
    marginY: 4,
    paddingY: 3,
    paddingX: { xs: 3, lg: 4 },
};

export const Title = styled.h2`
    margin: ${({ theme }) => theme.space[3]}px 0;
    font-weight: normal;
    font-size: ${({ theme }) => theme.sizes.subtitle};
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
