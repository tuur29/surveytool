import React from "react";
import { AllQuestionsType, questionTypes } from "../types/QuestionTypes";
import { useStoreSelector } from "../redux/store";
import { getImageAlignment, getQuestionIdHash } from "../utils/utils";
import { useBreakpoint } from "../hooks/windowHooks";
import { Container, Group, Line, Header, Description } from "./styles/Container";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import TextQuestion from "./questions/TextQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import ShowResultsButton from "./questions/ShowResultsButton";
import QuestionTable from "./groups/QuestionTable";
import { Image, ImageWrapper } from "./styles/Image";

const determineComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case questionTypes.single:
            return <SingleChoiceQuestion key={getQuestionIdHash(question)} question={question} />;
        case questionTypes.multiple:
            return <MultipleChoiceQuestion key={getQuestionIdHash(question)} question={question} />;
        case questionTypes.text:
            return <TextQuestion key={getQuestionIdHash(question)} question={question} />;
        case questionTypes.range:
            return <RangeQuestion key={getQuestionIdHash(question)} question={question} />;
    }
};

const QuestionGroupList = (): JSX.Element | null => {
    const config = useStoreSelector((state) => state.config);
    const isMobile = useBreakpoint("md", "max", true);

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
                    <ImageWrapper imagePosition={getImageAlignment(group.image, isMobile)}>
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

                    {group.tabledView ? (
                        <QuestionTable group={group} />
                    ) : (
                        <div>{group.questions.map(determineComponent)}</div>
                    )}
                </Group>
            ))}
            <ShowResultsButton />
        </Container>
    );
};

export default QuestionGroupList;
