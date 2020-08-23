import React from "react";
import { ResultGraphType } from "../../types/ResultTypes";
import useGraphData from "../../hooks/useGraphData";
import { Loader } from "../styles/Loader";
import { Wrapper } from "../styles/Graph";
import { Title, Result } from "../styles/Result";
import Graph from "../common/Graph";

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
                {loading || !data ? <Loader my={2} /> : <Graph type={format} data={data} />}
            </Wrapper>
        </Result>
    );
};

export default GraphResult;
