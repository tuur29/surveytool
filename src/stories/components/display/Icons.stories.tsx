import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Icon, { iconTypes, orientations } from "../../../components/common/Icon";
import { defaultThemes } from "../../../utils/theme";
import { getEnumValues } from "../../utils/helpers";

// ----------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------

export default {
    title: "Components/Display/Icons",
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
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        {iconTypes.map((icon) => (
            <p key={icon} style={{ display: "flex", alignItems: "center", padding: 16 }}>
                <Icon
                    type={icon}
                    size={size}
                    color={color}
                    orientation={(orientations[orientation as orientations] as unknown) as orientations}
                />
                <span style={{ padding: 8, verticalAlign: "middle" }}>{icon}</span>
            </p>
        ))}
    </div>
);
