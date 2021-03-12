import React from "react";
import { Wrapper, Dial, Counter } from "../styles/Dial180";

type PropsType = {
    /** Float from 0.0 - 1.0. */
    dialPercentage: number;
    /** Text to be displayed beneath the arc */
    label: string;
    /** Width in pixels. The height of the component will be half this because only half of a circle is visible. */
    /** When enabled the border will fill up in an animation */
    animate?: boolean;
};

const ScoreCounter180 = (props: PropsType): JSX.Element => {
    const { dialPercentage, label, animate } = props;

    const maxAngle = 180;
    const angle = dialPercentage * maxAngle;
    const limitedAngle = Math.max(0, Math.min(angle, maxAngle));

    return (
        <Wrapper>
            <Dial angle={limitedAngle} enableAnimation={animate} />
            <Counter>{label}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter180;
