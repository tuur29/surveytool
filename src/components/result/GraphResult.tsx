import React from "react";
import { ResultGraphType } from "../../types/ResultTypes";
import useGraphData from "../../hooks/useGraphData";
import { Loader } from "../styles/Loader";
import { Wrapper } from "../styles/Graph";
import { Title, Result } from "../styles/Result";
import { SeriesDataTypes } from "../../types/DataTypes";
import LineGraph from "../common/LineGraph";

const determineGraph = (format: ResultGraphType["format"], data: SeriesDataTypes): JSX.Element | null => {
    switch (format) {
        case "line":
            return <LineGraph data={data} />;
        default:
            return null;
    }
};

type PropsType = {
    config: ResultGraphType;
};

const GraphResult = (props: PropsType): JSX.Element => {
    const { titleLabel, dataUrl, format } = props.config;
    const { data, loading } = useGraphData(dataUrl);

    return (
        <Result>
            <Wrapper>
                <Title>{titleLabel}</Title>
                {(loading|| !data) ? <Loader my={2}/> : determineGraph(format, data)}
            </Wrapper>
        </Result>
    );
};

export default GraphResult;
