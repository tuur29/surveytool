import React, { Fragment } from "react";
import { Slider as CompoundSlider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { useTheme } from "styled-components";
import { SliderWrapper, SliderRail, SliderHandle, SliderTick, SliderTrack, SliderTickLabel } from "../styles/Input";
import { RangeDirectionType } from "../../types/QuestionTypes";
import { BreakpointType } from "../../utils/theme";

type PropsType = {
    min: number;
    max: number;
    value: number;
    step: number;
    direction: RangeDirectionType;
    tickCount?: number;
    tickValues?: number[];
    tickLabels?: (string | null)[];
    onChange: (value: number) => void;
};

const Slider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, tickCount, tickValues, tickLabels, onChange } = props;
    const { breakpoints, space } = useTheme();

    const size: BreakpointType = (max - min) / step > 15 ? "md" : "sm";

    return (
        <SliderWrapper width={{ xs: 1, [size]: parseInt(breakpoints[size]) - space[4] * 2 }}>
            <CompoundSlider
                mode={1}
                domain={[min, max]}
                step={step}
                values={[value]}
                reversed={direction === "decrease"}
                onChange={(values) => onChange(values[0])}
            >
                <Rail>{({ getRailProps }) => <SliderRail {...getRailProps()} />}</Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map((handle) => (
                                <SliderHandle key={handle.id} percent={handle.percent} {...getHandleProps(handle.id)} />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                            {tracks.map(({ id, source }) => (
                                <SliderTrack key={id} percent={source.percent} {...getTrackProps()} />
                            ))}
                        </div>
                    )}
                </Tracks>
                <Ticks count={tickCount} values={tickValues}>
                    {({ ticks }) => (
                        <div className="slider-ticks">
                            {ticks.map((tick, tickIndex) => (
                                <Fragment key={tick.id}>
                                    <SliderTick percent={tick.percent} />
                                    <SliderTickLabel percent={tick.percent}>
                                        {tickLabels?.[tickIndex] || tick.value}
                                    </SliderTickLabel>
                                </Fragment>
                            ))}
                        </div>
                    )}
                </Ticks>
            </CompoundSlider>
        </SliderWrapper>
    );
};

export default Slider;
