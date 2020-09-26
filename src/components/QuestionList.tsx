import React from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { useStoreSelector } from "../redux/store";
import { useLabels } from "../hooks/useLabel";
import { Container, Description, Header } from "./styles/Container";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import ShowResultsButton from "./questions/ShowResultsButton";

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
    const [titleLabel, descriptionLabel] = useLabels(["questionsTitle", "questionsDescription"]);

    if (!config.questions.length) return null;
    return (
        <Container py={4}>
            {titleLabel && <Header>{titleLabel}</Header>}
            {descriptionLabel && <Description>{descriptionLabel}</Description>}
            {config.questions.map(determineComponent)}

            <ShowResultsButton />
        </Container>
    );
};

export default QuestionList;
