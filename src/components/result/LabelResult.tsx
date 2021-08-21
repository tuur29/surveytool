import React, { useState, useEffect, useRef } from "react";
import { ResultLabelType } from "../../types/ResultTypes";
import { Result } from "../styles/Result";
import { Description, Header } from "../styles/Container";
import { useStoreSelector } from "../../redux/store";
import {
    resultAnimationTotalFrames,
    resultAnimationFrameLength,
    useAfterFirstRender,
    replaceValues,
} from "../../utils/utils";
import ScoreCounter180 from "../common/ScoreCounter180";
import ScoreCounter270 from "../common/ScoreCounter270";
import { useRestartTimer } from "../../hooks/timerHooks";

const rescaleToDomain = (value: number, sourceDomain: number[], targetDomain: number[]): number => {
    // Rescale the value based on the formula for linear interpolation
    return (
        ((targetDomain[1] - targetDomain[0]) / (sourceDomain[1] - sourceDomain[0])) * (value - sourceDomain[0]) +
        targetDomain[0]
    );
};

type PropsType = {
    config: ResultLabelType;
};

const LabelResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const domain = useStoreSelector((state) => state.config.result.scoreDomain || [0, 1]);

    const afterFirstRender = useAfterFirstRender(); // makes sure scoreCounter animation is visible when reloading page
    const countdown = useRestartTimer();

    // animation
    const animation = useRef<number>();
    const frame = useRef(0);
    const [displayedScore, setDisplayedScore] = useState(config.animate ? domain[0] : score); // default to score when not animating
    useEffect(() => {
        if (!config.animate) {
            setDisplayedScore(score);
            return;
        }

        // reset after actual score change
        setDisplayedScore(domain[0]);
        frame.current = 0;
        if (animation.current) clearInterval(animation.current);

        // start animation
        animation.current = setInterval(() => {
            if (frame.current >= resultAnimationTotalFrames) {
                clearInterval(animation.current);
                setDisplayedScore(score);
                return;
            }
            frame.current = frame.current + 1;
            setDisplayedScore(score * (frame.current / resultAnimationTotalFrames));
        }, resultAnimationFrameLength); // ms
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);

    // display score and countdown in label
    const labelParts = config.label.split(new RegExp("\\{score(\\d+)?\\}")); // split label on each possible score placeholder and keep X value
    const label =
        replaceValues(
            labelParts
                .map((text, index) => {
                    if (index % 2 === 0) return text; // only uneven items are placeholders for score
                    if (text === undefined) return Math.round(displayedScore); // {score}
                    return Math.round(rescaleToDomain(displayedScore, domain, [0, parseInt(text)])); // {scoreX}
                })
                .join(""),
            { countdown },
        ) || "";

    return (
        <Result>
            {config.style === "title" && <Header>{label}</Header>}
            {config.style === "description" && <Description>{label}</Description>}
            {config.style === "scoreCounter180" && (
                <ScoreCounter180
                    dialPercentage={afterFirstRender ? rescaleToDomain(score, domain, [0, 1]) : 0}
                    label={label}
                    animate={props.config.animate}
                />
            )}
            {config.style === "scoreCounter270" && (
                <ScoreCounter270
                    dialPercentage={afterFirstRender ? rescaleToDomain(score, domain, [0, 1]) : 0}
                    label={label}
                    animate={props.config.animate}
                />
            )}
        </Result>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const LabelResultDoc = (props: ResultLabelType): null => props && null;

export default LabelResult;
