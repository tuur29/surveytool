import React from "react";
import { Wrapper, Dial, Counter } from "../styles/Dial";

type PropsType = {
    value: number;
    textValue: number;
    min: number;
    max: number;
};

const ScoreCounter = (props: PropsType): JSX.Element => {
    const { value, textValue, min, max } = props;

    const size = 200;
    const angle = ((value - min) / (max - min)) * 180;
    const limitedAngle = Math.max(0, Math.min(angle, 180));

    return (
        <Wrapper size={size}>
            <Dial size={size} angle={limitedAngle} />
            <Counter size={size}>{Math.round(textValue)}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter;
