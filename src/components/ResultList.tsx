import React from "react";
import useLabel from "../hooks/useLabel";
import { useStoreSelector } from "../redux/store";
import { AllResultContentType, resultContentTypes } from "../types/ResultTypes";
import { Container, Header } from "./styles/Container";
import LabelResult from "./result/LabelResult";

const determineComponent = (block: AllResultContentType, index: number): JSX.Element => {
    switch (block.type) {
        case resultContentTypes.label:
            return <LabelResult key={index} config={block} />;
        case resultContentTypes.button:
            return <div key={index} />;
        case resultContentTypes.graph:
            return <div key={index} />;
        case resultContentTypes.iframe:
            return <div key={index} />;
    }
};

const ResultList = (): JSX.Element | null => {
    const content = useStoreSelector((state) => state.config.result.content);
    const titleLabel = useLabel("resultTitle");

    if (!content || !content.length) return null;
    return (
        <Container py={4}>
            {titleLabel && <Header>{titleLabel}</Header>}
            {content.map(determineComponent)}
        </Container>
    );
};

export default ResultList;
