import React from "react";
import { ResultLabelType } from "../../types/ResultTypes";
import { Result, Title, Description } from "../styles/Result";
import { useStoreSelector } from "../../redux/store";

type PropsType = {
    config: ResultLabelType;
};

const LabelResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const domain = useStoreSelector((state) => state.config.result.scoreDomain || [0, 1]);

    const labelParts = config.label.split(new RegExp("\\{score(\\d+)?\\}")); // split label on each possible score placeholder and keep X value
    const filledInParts = labelParts.map((text, index) => {
        if (index % 2 === 0) return text; // only uneven items are placeholders for score
        if (text === undefined) return score; // {score}
        return Math.round((score / (domain[1] - domain[0])) * parseInt(text)); // {scoreX}
    });

    // TODO: implement scoreCounter
    return (
        <Result>
            {config.style === "title" && <Title>{filledInParts.join("")}</Title>}
            {config.style === "description" && <Description>{filledInParts.join("")}</Description>}
        </Result>
    );
};

export default LabelResult;
