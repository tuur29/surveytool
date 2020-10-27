import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Icon, { iconTypes, orientations } from "../../components/common/Icon";
import { defaultThemes } from "../../utils/theme";
import { getEnumValues } from "../utils/helpers";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Theme/Icons",
    component: Icon,
    argTypes: {
        onClick: { action: "clicked" },
        orientation: {
            control: {
                type: "select",
                options: getEnumValues(orientations),
            },
        },
        size: {
            defaultValue: 30,
        },
        color: {
            defaultValue: "onBack",
            control: {
                type: "select",
                options: Object.keys(defaultThemes.lightTheme.colors),
            },
        },
    },
} as Meta;

// ----------------------------------------------------------------------
// Stories
// ----------------------------------------------------------------------

type PropsType = React.ComponentProps<typeof Icon>;
export const Text = ({ size, color, orientation }: PropsType): JSX.Element => (
    <div>
        {iconTypes.map((icon) => (
            <span key={icon} style={{ padding: 8 }}>
                <Icon type={icon} size={size} color={color} orientation={orientations[orientation as any] as any} />
            </span>
        ))}
    </div>
);
