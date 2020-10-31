import React from "react";
import styled, { css } from "styled-components";
import { ColorType } from "../../utils/theme";
import { ReactComponent as IconInfo } from "../../svg/info-circle-solid.svg";
import { ReactComponent as IconCloseCircle } from "../../svg/times-circle-solid.svg";
import { ReactComponent as IconUpCaret } from "../../svg/caret-up-solid.svg";
import { ReactComponent as IconCheck } from "../../svg/check-solid.svg";
import { ReactComponent as IconError } from "../../svg/exclamation-triangle-solid.svg";
import { ReactComponent as IconNext } from "../../svg/arrow-circle-right-solid.svg";
import { ReactComponent as IconClose } from "../../svg/times-solid.svg";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

const icons = {
    info: IconInfo,
    closeCircle: IconCloseCircle,
    upCaret: IconUpCaret,
    check: IconCheck,
    error: IconError,
    next: IconNext,
    close: IconClose,
};
type IconType = keyof typeof icons;
export const iconTypes = Object.keys(icons) as IconType[];

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
        position: relative;
        top: 2px;
        align-self: center;

        color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.icon)};
        width: 1em;
        height: 1em;
        transition: transform 0.3s, width 0.3s, height 0.3s, color 0.3s;
        transform-origin: center;

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
