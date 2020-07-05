import React, { useState, useCallback, MouseEvent, TouchEvent, useRef, useEffect, useMemo } from "react";
import { SliderWrapper, SliderTrack, SliderHandle, SliderHandleLabel, SliderLabel, SliderMark } from "../styles/Input";
import { SliderDirectionType } from "../../types/ConfigTypes";

type PropsType = {
    min: number;
    max: number;
    value: number;
    step: number;
    direction: SliderDirectionType;
    onChange: (value: number) => void;
};

// TODO: finish slider
const Slider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, onChange } = props;

    // the actual value in the state will only be updated once the users lets go of the handle
    const isDragging = useRef(false);
    const [visualValue, setVisualValue] = useState(value);

    const percentage = (visualValue * 100) / (max - min);

    // ----------------------------------------------------------------------
    // Event handlers
    // ----------------------------------------------------------------------

    const onStart = useCallback((event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
    }, []);

    const onMove = useCallback((event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        if (isDragging.current) {
            // console.log((event as any).clientX());
            setVisualValue(3);
        }
    }, []);

    const onEnd = useCallback((event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        isDragging.current = false;
        onChange(visualValue);
    }, []);

    // update the visual value if parent forces change
    useEffect(() => {
        setVisualValue(value);
    }, [value]);

    // TODO: add first and list items
    const marks: number[] = useMemo(() => {
        const total = (max - min) / step;
        return new Array(total)
            .fill(0)
            .map((_, index) => (index * 100) / total)
            .filter((_, index) => index > 0);
    }, [min, max, step, direction]);

    return (
        <SliderWrapper>
            <SliderLabel location="left">{direction === "toLeft" ? max : min}</SliderLabel>
            <SliderTrack percentage={percentage} direction={direction} />

            {marks.map((percentage, index) => (
                <SliderMark key={index} direction={direction} percentage={percentage} />
            ))}

            <SliderHandle
                percentage={percentage}
                direction={direction}
                onMouseDown={onStart}
                onMouseMove={onMove}
                onMouseUp={onEnd}
                onTouchStart={onStart}
                onTouchMove={onMove}
                onTouchEnd={onEnd}
            >
                <SliderHandleLabel>{visualValue}</SliderHandleLabel>
            </SliderHandle>
            <SliderLabel location="right">{direction === "toLeft" ? min : max}</SliderLabel>
        </SliderWrapper>
    );
};

export default Slider;
