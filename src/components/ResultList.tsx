import React, { useRef, useEffect } from "react";
import useLabel from "../hooks/useLabel";
import { useStoreSelector } from "../redux/store";
import { AllResultContentType, resultContentTypes } from "../types/ResultTypes";
import { Container, Header } from "./styles/Container";
import LabelResult from "./result/LabelResult";
import GraphResult from "./result/GraphResult";
import ButtonResult from "./result/ButtonResult";

const determineComponent = (block: AllResultContentType, index: number): JSX.Element => {
    switch (block.type) {
        case resultContentTypes.label:
            return <LabelResult key={index} config={block} />;
        case resultContentTypes.button:
            return <ButtonResult key={index} config={block} />;
        case resultContentTypes.graph:
            return <GraphResult key={index} config={block} />;
        case resultContentTypes.iframe:
            return <div key={index} />;
    }
};

const ResultList = (): JSX.Element | null => {
    const content = useStoreSelector((state) => state.config.result.content);
    const titleLabel = useLabel("resultTitle");
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll to results when it becomes visible
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    if (!content || !content.length) return null;
    return (
        <Container ref={containerRef} py={4} maxBreakpoint="lg">
            {titleLabel && <Header>{titleLabel}</Header>}
            {content.map(determineComponent)}
        </Container>
    );
};

export default ResultList;
