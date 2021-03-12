import React from "react";
import { Wrapper, GenericDial, MaskDial, Counter } from "../styles/Dial270";

type PropsType = {
    /** Float from 0.0 - 1.0. */
    dialPercentage: number;
    /** Text to be displayed beneath the arc */
    label: string;
    /** When enabled the border will fill up in an animation */
    animate?: boolean;
};

const ScoreCounter270 = (props: PropsType): JSX.Element => {
    const { dialPercentage, label, animate } = props;

    const maxAngle = 270;
    const angle = dialPercentage * maxAngle;
    const limitedAngle = Math.max(0, Math.min(angle, maxAngle));

    const items = new Array(4).fill(""); // we need 4 items to get rid of imperfect css borders

    return (
        <Wrapper>
            {items.map((_, index) => (
                <GenericDial
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type="filled"
                    angle={limitedAngle * ((index + 1) / items.length)}
                    enableAnimation={animate}
                />
            ))}

            {items.map((_, index) => (
                <GenericDial
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type="empty"
                    angle={-(maxAngle - limitedAngle) * ((index + 1) / items.length)}
                    enableAnimation={animate}
                />
            ))}

            <MaskDial />
            <Counter>{label}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter270;
