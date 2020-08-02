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
    // const labelPlaceholder = config.label.match(/\{score(\d.)\}/i); // TODO: finish implementation

    const formattedLabel = config.label.replace("{score}", `${score}`);

    return (
        <Result>
            {config.style === "title" && <Title>{formattedLabel}</Title>}
            {config.style === "description" && <Description>{formattedLabel}</Description>}
        </Result>
    );
};

export default LabelResult;
