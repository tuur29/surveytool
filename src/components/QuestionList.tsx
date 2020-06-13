import React from "react";
import BasicQuestion from "./questions/BasicQuestion";
import useConfig from "../hooks/useConfig";
import { AllQuestionsType, answerTypes } from "../types/ConfigTypes";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { Container } from "./styles/Container";
import { Spinner, CenterWrapper } from "./styles/Spinner";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case answerTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        default:
            return <BasicQuestion key={question.id} title={question.title} />;
    }
};

const QuestionList = (): JSX.Element | null => {
    const config = useConfig();

    if (!config)
        return (
            <CenterWrapper>
                <Spinner />
            </CenterWrapper>
        );

    return (
        <Container>
            {config.questions.map(determineComponent)}
        </Container>
    );
};

export default QuestionList;
