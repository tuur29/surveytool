import React from "react";
import { AllQuestionsType, answerTypes } from "../types/ConfigTypes";
import Icon from "../svg/Icon";
import { useStore } from "../redux/store";
import PlaceholderQuestion from "./questions/PlaceholderQuestion";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { Container } from "./styles/Container";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case answerTypes.single:
            return <SingleChoiceQuestion key={question.id} question={question} />;
        default:
            return <PlaceholderQuestion key={question.id} title={question.title} />;
    }
};

const QuestionList = (): JSX.Element | null => {
    const config = useStore(state => state.config);

    if (!config.questions.length) return null;
    return (
        <Container>
            <Icon type="acorn" color="primary" size={40} />
            {config.questions.map(determineComponent)}
        </Container>
    );
};

export default QuestionList;
