import React from "react";
import { Wrapper, Mask, Dial, Counter } from "../styles/Dial";

type PropsType = {
    value: number;
    min: number;
    max: number;
};

const ScoreCounter = (props: PropsType): JSX.Element => {
    const { value, min, max } = props;

    return (
        <Wrapper width={200} height={200}>
            <Dial value={value} min={min} max={max} />
            <Mask borderPercentage={10} />
            <Counter>{Math.round(value)}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter;
