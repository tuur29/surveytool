import React from "react";
import { ResultGraphType } from "../../types/ResultTypes";
import useGraphData from "../../hooks/useGraphData";
import { Loader } from "../styles/Loader";

type PropsType = {
    config: ResultGraphType;
};

const GraphResult = (props: PropsType): JSX.Element => {
    const { titleLabel, dataUrl } = props.config;
    const { series, loading } = useGraphData(dataUrl);

    if (loading) return <Loader />;
    return (
        <>
            {titleLabel}
            <pre>{JSON.stringify(series, undefined, 4)}</pre>
        </>
    );
};

export default GraphResult;
