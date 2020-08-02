import React from "react";
import { useStoreSelector } from "../redux/store";

const ResultList = (): JSX.Element => {
    const score = useStoreSelector(state => state.result.score);
    return <div>Score: {score}</div>;
};

export default ResultList;
