import React from "react";
import styled from "styled-components";
import { ColorType } from "../utils/theme";
import { ReactComponent as IconAcorn } from "./acorn-solid.svg";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

const icons = {
    acorn: IconAcorn,
};
type IconType = keyof typeof icons;

// ----------------------------------------------------------------------
// Styling wrappers
// ----------------------------------------------------------------------

type SvgProps = { size?: number; color?: ColorType };
const IconWrapper = styled.span<SvgProps>`
    svg {
        width: ${({ theme, size }) => size || theme.iconSize}px;
        height: ${({ theme, size }) => size || theme.iconSize}px;
        color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.foreSoft)};
    }
`;

const Icon = (props: SvgProps & { type: IconType }): JSX.Element => {
    const Component = icons[props.type];
    return (
        <IconWrapper {...props}>
            <Component />
        </IconWrapper>
    );
};

export default Icon;
