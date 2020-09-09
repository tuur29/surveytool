import React, { useState, useEffect, useRef } from "react";
import { ResultLabelType } from "../../types/ResultTypes";
import { Result, Title, Description } from "../styles/Result";
import { useStoreSelector } from "../../redux/store";
import { resultAnimationTotalFrames, resultAnimationFrameLength, useAfterFirstRender } from "../../utils/utils";
import ScoreCounter from "./ScoreCounter";

type PropsType = {
    config: ResultLabelType;
};

const LabelResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const domain = useStoreSelector((state) => state.config.result.scoreDomain || [0, 1]);

    const afterFirstRender = useAfterFirstRender(); // makes sure scoreCounter animation is visible when reloading page

    // animation
    const animation = useRef<number>();
    const frame = useRef(0);
    const [animatedScore, setAnimatedScore] = useState(config.animate ? domain[0] : score); // default to score when not animating
    useEffect(() => {
        if (!config.animate) return;

        // reset after actual score change
        setAnimatedScore(domain[0]);
        frame.current = 0;
        if (animation.current) clearInterval(animation.current);

        // start animation
        animation.current = setInterval(() => {
            if (frame.current >= resultAnimationTotalFrames) {
                clearInterval(animation.current);
                setAnimatedScore(score);
                return;
            }
            frame.current = frame.current + 1;
            setAnimatedScore(score * (frame.current / resultAnimationTotalFrames));
        }, resultAnimationFrameLength); // ms
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);

    // display score in label
    const labelParts = config.label.split(new RegExp("\\{score(\\d+)?\\}")); // split label on each possible score placeholder and keep X value
    const filledInParts = labelParts.map((text, index) => {
        if (index % 2 === 0) return text; // only uneven items are placeholders for score
        if (text === undefined) return Math.round(animatedScore); // {score}
        return Math.round(((animatedScore - domain[0]) / (domain[1] - domain[0])) * parseInt(text)); // {scoreX}
    });

    return (
        <Result>
            {config.style === "title" && <Title>{filledInParts.join("")}</Title>}
            {config.style === "description" && <Description>{filledInParts.join("")}</Description>}
            {config.style === "scoreCounter" && (
                <ScoreCounter
                    value={afterFirstRender ? score : 0}
                    textValue={filledInParts.join("")}
                    min={domain[0]}
                    max={domain[1]}
                />
            )}
        </Result>
    );
};

export default LabelResult;
