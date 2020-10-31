import React from "react";
import { Wrapper, Dial, Counter } from "../styles/Dial";

type PropsType = {
    /** Float from 0.0 - 1.0. */
    dialPercentage: number;
    /** Text to be displayed beneath the arc */
    label: string;
    /** Width in pixels. The height of the component will be half this because only half of a circle is visible. */
    size?: number;
    /** Thickness of the border representing the dialPercentage. */
    borderSize?: number;
    /** When enabled the border will fill up in an animation */
    animate?: boolean;
};

const ScoreCounter = (props: PropsType): JSX.Element => {
    const { dialPercentage, label, size = 200, borderSize = 20, animate } = props;
    const angle = dialPercentage * 180;
    const limitedAngle = Math.max(0, Math.min(angle, 180));

    return (
        <Wrapper size={size}>
            <Dial size={size} angle={limitedAngle} borderSize={borderSize} enableAnimation={animate} />
            <Counter size={size}>{label}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter;
