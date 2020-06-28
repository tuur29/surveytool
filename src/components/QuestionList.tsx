import React from "react";
import { AllQuestionsType, answerTypes } from "../types/ConfigTypes";
import { useStore } from "../redux/store";
import PlaceholderQuestion from "./questions/PlaceholderQuestion";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { Container } from "./styles/Container";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case answerTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        case answerTypes.multiple:
            return <MultipleChoiceQuestion key={question.id} question={question} />;
        default:
            return <PlaceholderQuestion key={question.id} title={question.title} />;
    }
};

const QuestionList = (): JSX.Element | null => {
    const config = useStore(state => state.config);

    if (!config.questions.length) return null;
    return (
        <Container>
            {config.questions.map(determineComponent)}
        </Container>
    );
};

export default QuestionList;
