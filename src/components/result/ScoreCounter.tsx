import React from "react";
import { Wrapper, Dial, Counter } from "../styles/Dial";

type PropsType = {
    dialPercentage: number;
    label: string;
};

const ScoreCounter = (props: PropsType): JSX.Element => {
    const { dialPercentage, label } = props;

    const size = 200;
    const angle = dialPercentage * 180;
    const limitedAngle = Math.max(0, Math.min(angle, 180));

    return (
        <Wrapper size={size}>
            <Dial size={size} angle={limitedAngle} />
            <Counter size={size}>{label}</Counter>
        </Wrapper>
    );
};

export default ScoreCounter;
