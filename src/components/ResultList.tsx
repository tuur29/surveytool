import React, { useRef, useEffect, useMemo } from "react";
import { useStoreSelector } from "../redux/store";
import { AllResultContentType, resultContentTypes } from "../types/ResultTypes";
import { useInitResetTimer } from "../hooks/timerHooks";
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
    const showResult = useStoreSelector((state) => state.result.showResult);
    const content = useStoreSelector((state) => state.config.result.content);
    const score = useStoreSelector((state) => state.result.score);
    const containerRef = useRef<HTMLDivElement>(null);

    useInitResetTimer();

    // Scroll to results when it becomes visible
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // We need to wrap this in useMemo because the useInitResetTimer will otherwise trigger a re-render every second
    return useMemo(() => {
        if (!showResult || !content || !content.length) return null;
        return (
            <Container ref={containerRef} pb={4} maxBreakpoint="lg">
                {content
                    .filter(
                        (block) =>
                            !block.visibleScoreDomain ||
                            (block.visibleScoreDomain[0] <= score && score <= block.visibleScoreDomain[1]),
                    )
                    .map(determineComponent)}
            </Container>
        );
    }, [showResult, content, score]);
};

export default ResultList;
