import React from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { useStoreSelector } from "../redux/store";
import { formatTimestamp } from "../utils/utils";
import useLabel, { useLabels } from "../hooks/useLabel";
import { Container, Header, Footer } from "./styles/Container";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import ResultsButton from "./results/ResultsButton";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case questionTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        case questionTypes.multiple:
            return <MultipleChoiceQuestion key={question.id} question={question} />;
        case questionTypes.text:
            return <TextQuestion key={question.id} question={question} />;
        case questionTypes.range:
            return <RangeQuestion key={question.id} question={question} />;
    }
};

const QuestionList = (): JSX.Element | null => {
    const config = useStoreSelector((state) => state.config);
    const showAnsweredTimetamp = useStoreSelector((state) => state.answers.loadedFromStorage);
    const lastAnsweredTimestamp = useStoreSelector((state) => state.answers.lastUpdate);

    const [titleLabel, dateLocaleId] = useLabels(["questionsTitle", "dateLocaleId"]);
    const footerLabel = useLabel("questionsFooter", {
        date: formatTimestamp(lastAnsweredTimestamp, dateLocaleId),
    });

    if (!config.questions.length) return null;
    return (
        <Container py={4}>
            {titleLabel && <Header>{titleLabel}</Header>}
            {config.questions.map(determineComponent)}

            <ResultsButton />

            {/* TODO: move to app instead */}
            {showAnsweredTimetamp && footerLabel && <Footer>{footerLabel}</Footer>}
        </Container>
    );
};

export default QuestionList;
