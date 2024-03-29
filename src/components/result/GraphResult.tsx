import React from "react";
import { ResultGraphType } from "../../types/ResultTypes";
import useGraphData from "../../hooks/useGraphData";
import { Loader } from "../styles/Loader";
import {
    Title,
    Card,
    Legend,
    LegendItem,
    Wrapper,
    LegendSwatch,
    StatusWrapper,
    GRAPH_LOADER_SIZE,
} from "../styles/Graph";
import { Result } from "../styles/Result";
import Graph from "../common/Graph";
import Icon from "../common/Icon";

type PropsType = {
    config: ResultGraphType;
};

const GraphResult = (props: PropsType): JSX.Element => {
    const { titleLabel, dataUrl, format, hideLegend, halfWidth } = props.config;
    const { data, loading } = useGraphData(dataUrl);

    return (
        <Result halfWidth={halfWidth}>
            <Card>
                <Title>{titleLabel}</Title>
                <StatusWrapper>
                    {loading && <Loader size={GRAPH_LOADER_SIZE} />}
                    {!loading && !data && <Icon type="error" color="error" size={65} />}
                    {data && (
                        <Wrapper width={hideLegend ? 1 : undefined}>
                            <Graph type={format} data={data} />
                            {!hideLegend && (
                                <Legend>
                                    {data.series.map((series) => (
                                        <LegendItem key={series.id}>
                                            <LegendSwatch color={series.color} />
                                            <span>{series.name}</span>
                                        </LegendItem>
                                    ))}
                                </Legend>
                            )}
                        </Wrapper>
                    )}
                </StatusWrapper>
            </Card>
        </Result>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const GraphResultDoc = (props: ResultGraphType): null => props && null;

export default GraphResult;
