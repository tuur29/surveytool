import React, { Fragment } from "react";
import { Slider as CompoundSlider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderWrapper, SliderRail, SliderHandle, SliderTick, SliderTrack, SliderTickLabel } from "../styles/Input";
import { RangeDirectionType } from "../../types/ConfigTypes";

type PropsType = {
    min: number;
    max: number;
    value: number;
    step: number;
    direction: RangeDirectionType;
    tickCount: number;
    onChange: (value: number) => void;
};

const Slider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, tickCount, onChange } = props;

    return (
        <SliderWrapper>
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
                <Ticks count={tickCount}>
                    {({ ticks }) => (
                        <div className="slider-ticks">
                            {ticks.map((tick) => (
                                <Fragment key={tick.id}>
                                    <SliderTick percent={tick.percent} />
                                    <SliderTickLabel percent={tick.percent}>{tick.value}</SliderTickLabel>
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
