import React from "react";
import styled, { css } from "styled-components";
import { ColorType } from "../utils/theme";
import { ReactComponent as IconInfo } from "./info-circle-duotone.svg";
import { ReactComponent as IconClose } from "./times-circle-duotone.svg";
import { ReactComponent as IconUp } from "./caret-up-solid.svg";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

const icons = {
    info: IconInfo,
    close: IconClose,
    upCaret: IconUp,
};
type IconType = keyof typeof icons;

// ----------------------------------------------------------------------
// Styling wrappers
// ----------------------------------------------------------------------

export enum orientations { // values are numbers so they represent quadrants
    "up" = 0,
    "right" = 1,
    "down" = 2,
    "left" = 3,
}

type SvgProps = { size?: number; color?: ColorType; orientation?: orientations };
export const IconWrapper = styled.span<SvgProps>`
    svg {
        align-self: center;

        color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.icon)};
        width: 1em;
        height: 1em; /* TODO: should match font size exactly */
        transition: transform 0.3s, width 0.3s, height 0.3s, color 0.3s;

        &:hover {
            color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.iconHover)};
        }

        ${({ orientation }) =>
            orientation &&
            css`
                transform: rotate(${orientation * 90}deg);
            `};

        ${({ size }) =>
            size &&
            css`
                width: ${size}px;
                height: ${size}px;
            `};
    }
`;

type PropsType = SvgProps & { type: IconType; onClick?: (event: React.SyntheticEvent) => void };
const Icon = (props: PropsType): JSX.Element => {
    const Component = icons[props.type];
    return (
        <IconWrapper {...props}>
            <Component />
        </IconWrapper>
    );
};

export default Icon;
