import React, { Fragment } from "react";
import { Slider as CompoundSlider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { useTheme } from "styled-components";
import { SliderWrapper, SliderRail, SliderHandle, SliderTick, SliderTrack, SliderTickLabel } from "../styles/Input";
import { RangeDirectionType } from "../../types/QuestionTypes";
import { BreakpointType } from "../../utils/theme";

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
    /** Will spread out this amount of ticks on the slider. */
    tickCount?: number;
    /** When set, the ticks will be displayed at these exact values. Will override the `tickCount` setting. */
    tickValues?: number[];
    /** When set, will override the tick labels (normally just the value). Use `null` to keep a tick label empty. */
    tickLabels?: (string | null)[];
    /** Callback run when value is changed by the user. */
    onChange: (value: number) => void;
    /** By default the slider's width is related to the breakpoints size for a pleasing effect. Set this to full the width instead. */
    fullWidth?: boolean;
};

const Slider = (props: PropsType): JSX.Element => {
    const { min, max, value, step, direction, onChange, disabled, fullWidth } = props;
    const { tickCount, tickValues, tickLabels } = props;
    const { breakpoints, space } = useTheme();

    const size: BreakpointType = (max - min) / step > 15 ? "md" : "sm";

    return (
        <SliderWrapper width={fullWidth ? 1 : { xs: 1, [size]: parseInt(breakpoints[size]) - space[4] * 2 }}>
            <CompoundSlider
                mode={1}
                domain={[min, max]}
                step={step}
                values={[value]}
                reversed={direction === "decrease"}
                onChange={(values) => onChange(values[0])}
                disabled={disabled}
            >
                <Rail>{({ getRailProps }) => <SliderRail disabled={disabled} {...getRailProps()} />}</Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map((handle) => (
                                <SliderHandle
                                    key={handle.id}
                                    percent={handle.percent}
                                    disabled={disabled}
                                    {...getHandleProps(handle.id)}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                            {tracks.map(({ id, source }) => (
                                <SliderTrack
                                    key={id}
                                    percent={source.percent}
                                    disabled={disabled}
                                    {...getTrackProps()}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <Ticks count={tickCount} values={tickValues}>
                    {({ ticks }) => (
                        <div className="slider-ticks">
                            {ticks.map((tick, tickIndex) => (
                                <Fragment key={tick.id}>
                                    <SliderTick percent={tick.percent} disabled={disabled} />
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
