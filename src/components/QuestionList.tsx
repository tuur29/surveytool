import React from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { useStoreSelector } from "../redux/store";
import { Container, Group, Line, Header, Description } from "./styles/Container";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import ShowResultsButton from "./questions/ShowResultsButton";
import { Image, ImageWrapper } from "./styles/Image";

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
                <Group
                    key={i}
                    showSeparator={i > 0}
                    accentColor={group.accentColor}
                    questionBackgroundColor={group.backgroundColor}
                >
                    <Line />
                    <ImageWrapper imagePosition={group.image ? group.image.alignment || "right" : undefined}>
                        <div>
                            {group.title && <Header>{group.title}</Header>}
                            {group.description && (
                                <Description>
                                    <span dangerouslySetInnerHTML={{ __html: group.description }} />
                                </Description>
                            )}
                        </div>

                        {group.image && (
                            <Image src={group.image.url} widthPercentage={group.image.size} alt={group.image.alt} />
                        )}
                    </ImageWrapper>
                    <div>{group.questions.map(determineComponent)}</div>
                </Group>
            ))}
            <ShowResultsButton />
        </Container>
    );
};

export default QuestionList;
