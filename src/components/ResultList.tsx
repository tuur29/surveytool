import React, { useRef, useEffect } from "react";
import { useStoreSelector } from "../redux/store";
import { AllResultContentType, resultContentTypes } from "../types/ResultTypes";
import { Container } from "./styles/Container";
import LabelResult from "./result/LabelResult";
import GraphResult from "./result/GraphResult";
import ButtonResult from "./result/ButtonResult";
import IFrameResult from "./result/IFrameResult";

const determineComponent = (block: AllResultContentType, index: number): JSX.Element => {
    switch (block.type) {
        case resultContentTypes.label:
            return <LabelResult key={index} config={block} />;
        case resultContentTypes.button:
            return <ButtonResult key={index} config={block} />;
        case resultContentTypes.graph:
            return <GraphResult key={index} config={block} />;
        case resultContentTypes.iframe:
            return <IFrameResult key={index} config={block} />;
    }
};

const ResultList = (): JSX.Element | null => {
    const content = useStoreSelector((state) => state.config.result.content);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll to results when it becomes visible
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    if (!content || !content.length) return null;
    return (
        <Container ref={containerRef} pb={4} maxBreakpoint="lg">
            {content.map(determineComponent)}
        </Container>
    );
};

export default ResultList;
