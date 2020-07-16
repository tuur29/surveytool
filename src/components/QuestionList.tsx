import React from "react";
import { AllQuestionsType, answerTypes } from "../types/ConfigTypes";
import { useStoreSelector } from "../redux/store";
import { formatTimestamp } from "../utils/utils";
import useLabel, { useLabels } from "../hooks/useLabel";
import { Container, Header, Footer } from "./styles/Container";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import RangeQuestion from "./questions/RangeQuestion";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case answerTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        case answerTypes.multiple:
            return <MultipleChoiceQuestion key={question.id} question={question} />;
        case answerTypes.text:
            return <TextQuestion key={question.id} question={question} />;
        case answerTypes.range:
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
            {showAnsweredTimetamp && footerLabel && <Footer>{footerLabel}</Footer>}
        </Container>
    );
};

export default QuestionList;
