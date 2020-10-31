import React from "react";
import { RangeDirectionType } from "../../types/QuestionTypes";
import { RadioListWrapper, BottomLabel, RadioButton } from "../styles/Input";

type PropsType = {
    /** Minimum allowed value */
    min: number;
    /** Maximum allowed value */
    max: number;
    /** Current value */
    value: number;
    /** The size of each step between slider positions / radio buttons. For example, setting this to 2 will only allow (un)even numbers. */
    step: number;
    /** Setting this to decrease will default to and put the maximum first. */
    direction: RangeDirectionType;
    /** Disable user interaction and display the value faded out. */
    disabled?: boolean;
    /** When set, the ticks will be displayed at these exact values. Will override the `tickCount` setting. */
    tickValues?: number[];
    /** When set, will override the tick labels (normally just the value). Use `null` to keep a tick label empty. */
    tickLabels?: (string | null)[];
    /** Callback run when the user clicks a value */
    onChange: (value: number) => void;
};

const RadioSlider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, tickValues, tickLabels, onChange, disabled } = props;

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
                    <BottomLabel key={itemValue} onClick={() => onChange(itemValue)} disabled={disabled}>
                        <RadioButton checked={value === itemValue} />
                        <div>{tickLabels?.[index] || itemValue}</div>
                    </BottomLabel>
                );
            })}
        </RadioListWrapper>
    );
};

export default RadioSlider;
