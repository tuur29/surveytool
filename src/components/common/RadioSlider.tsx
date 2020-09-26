import React from "react";
import { RangeDirectionType } from "../../types/QuestionTypes";
import { RadioListWrapper, BottomLabel, RadioButton } from "../styles/Input";

type PropsType = {
    min: number;
    max: number;
    value: number;
    step: number;
    direction: RangeDirectionType;
    tickValues?: number[];
    tickLabels?: (string | null)[];
    onChange: (value: number) => void;
};

const RadioSlider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, tickValues, tickLabels, onChange } = props;

    const radioTickValues =
        tickValues ||
        (new Array(max - min + 1)
            .fill(null)
            .map((_, index) => {
                if (step && index % step !== 0) return null;
                return min + index;
            })
            .filter((value, index) => value || index === 0) as number[]);

    const ticks = direction === "decrease" ? radioTickValues.reverse() : radioTickValues;

    return (
        <RadioListWrapper>
            {ticks.map((itemValue, index) => {
                return (
                    <BottomLabel key={itemValue} onClick={() => onChange(itemValue)}>
                        <RadioButton checked={value === itemValue} />
                        <div>{tickLabels?.[index] || itemValue}</div>
                    </BottomLabel>
                );
            })}
        </RadioListWrapper>
    );
};

export default RadioSlider;
