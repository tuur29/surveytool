import React, { useState, useEffect, useRef } from "react";
import { ResultLabelType } from "../../types/ResultTypes";
import { Result } from "../styles/Result";
import { Description, Header } from "../styles/Container";
import { useStoreSelector } from "../../redux/store";
import {
    resultAnimationTotalFrames,
    resultAnimationFrameLength,
    replaceValues,
    removeDigitsFromText,
} from "../../utils/utils";
import { useAfterFirstRender } from "../../hooks/useAfterFirstRender";
import ScoreCounter180 from "../common/ScoreCounter180";
import ScoreCounter270 from "../common/ScoreCounter270";
import { useRestartTimer } from "../../hooks/timerHooks";
import { ScoreDomainType, ScoreType } from "../../types/CommonTypes";

const rescaleToDomain = (value: number, sourceDomain: number[], targetDomain: number[]): number => {
    // Rescale the value based on the formula for linear interpolation
    return (
        ((targetDomain[1] - targetDomain[0]) / (sourceDomain[1] - sourceDomain[0])) * (value - sourceDomain[0]) +
        targetDomain[0]
    );
};

const mapToDomainStart = (domains: ScoreDomainType): ScoreType => {
    const scoreEntries = Object.entries(domains).map(([scoreKey, domain]) => [scoreKey, domain[0]]);
    return Object.fromEntries(scoreEntries);
};

type PropsType = {
    config: ResultLabelType;
};

const LabelResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const domains = useStoreSelector((state) => state.config.result.scoreDomains || {});
    const scoreTypes = useStoreSelector((state) => state.config.result.scoreTypes);

    const afterFirstRender = useAfterFirstRender(); // makes sure scoreCounter animation is visible when reloading page
    const countdown = useRestartTimer();

    // animation
    const animation = useRef<number>();
    const frame = useRef(0);
    const [displayedScore, setDisplayedScore] = useState<ScoreType>(config.animate ? mapToDomainStart(domains) : score); // default to score when not animating
    useEffect(() => {
        if (!config.animate) {
            setDisplayedScore(score);
            return;
        }

        // reset after actual score change
        setDisplayedScore(mapToDomainStart(domains));
        frame.current = 0;
        if (animation.current) clearInterval(animation.current);

        // start animation
        animation.current = setInterval(() => {
            if (frame.current >= resultAnimationTotalFrames) {
                // show actual score when we reached the end of the animation
                clearInterval(animation.current);
                setDisplayedScore(score);
                return;
            }
            frame.current = frame.current + 1;

            const newScoreEntries = Object.entries(score).map(([scoreKey, total]) => [
                scoreKey,
                total * (frame.current / resultAnimationTotalFrames),
            ]);
            setDisplayedScore(Object.fromEntries(newScoreEntries));
        }, resultAnimationFrameLength); // ms
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);

    // add countdown to label
    const labelWithCountdown = replaceValues(config.label, { countdown }) || "";

    // display score in label
    const scoreLabelParts = labelWithCountdown.split(new RegExp("\\{(\\w+)\\}")); // split label on each possible score placeholder and keep X value
    const label = scoreLabelParts
        .map((text, index) => {
            if (index % 2 === 0) return text; // only uneven items are placeholders for score

            const scoreKey = removeDigitsFromText(text); // remove all digits from text
            const scoreBase = parseInt(text.replace(new RegExp("[A-Za-z]+"), "")); // remove all letters from text
            const scoreValue = displayedScore[scoreKey];

            if (scoreValue === undefined || Number.isNaN(scoreValue)) return "?"; // when things go wrong
            if (Number.isNaN(scoreBase)) return Math.round(scoreValue); // {mainScore}
            return Math.round(rescaleToDomain(scoreValue, domains[scoreKey], [0, scoreBase])); // {mainScoreX}
        })
        .join("");

    const counterScoreKey = (scoreLabelParts[1] ? removeDigitsFromText(scoreLabelParts[1]) : null) || scoreTypes[0];

    return (
        <Result halfWidth={config.halfWidth}>
            {config.style === "title" && <Header>{label}</Header>}
            {config.style === "description" && <Description>{label}</Description>}

            {config.style === "scoreCounter180" && (
                <ScoreCounter180
                    dialPercentage={
                        afterFirstRender ? rescaleToDomain(score[counterScoreKey], domains[counterScoreKey], [0, 1]) : 0
                    }
                    label={label}
                    animate={props.config.animate}
                />
            )}
            {config.style === "scoreCounter270" && (
                <ScoreCounter270
                    dialPercentage={
                        afterFirstRender ? rescaleToDomain(score[counterScoreKey], domains[counterScoreKey], [0, 1]) : 0
                    }
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
