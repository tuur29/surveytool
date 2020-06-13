import React from "react";
import BasicQuestion from "./questions/BasicQuestion";
import { List } from "./styles/Questions";
import useConfig from "../hooks/useConfig";
import { AllQuestionsType, answerTypes } from "../types/ConfigTypes";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { Container } from "./styles/Container";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case answerTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        default:
            return <BasicQuestion key={question.id} title={question.title} />
    }
};

const QuestionList = (): JSX.Element | null => {
    const config = useConfig();

    // TODO: show loader
    if (!config) return null;

    return (
        <Container>
            <List>
                {config.questions.map(determineComponent)}
            </List>
        </Container>
    );
};

export default QuestionList;
