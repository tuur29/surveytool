import React from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { useStoreSelector } from "../redux/store";
import { Container, Group, Line, Header, Description } from "./styles/Container";
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
    if (!config.groups.length) return null;
    return (
        <Container py={4}>
            {config.groups.map((group, i) => (
                <Group key={i} showSeparator={i > 0}>
                    <Line />
                    {/* TODO: implement hintable, description HTML, image & color support */}
                    {group.title && <Header>{group.title}</Header>}
                    {group.description && <Description>{group.description}</Description>}
                    {group.questions.map(determineComponent)}
                </Group>
            ))}
            <ShowResultsButton />
        </Container>
    );
};

export default QuestionList;
