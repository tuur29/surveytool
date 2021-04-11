import React from "react";
import { AllQuestionsType, QuestionGroup, questionTypes } from "../../types/QuestionTypes";
import { HeadingCell, Table } from "../styles/GroupTable";
import TabledSingleChoiceQuestion from "./TabledSingleChoiceQuestion";
import TabledMultipleChoiceQuestion from "./TabledMultipleChoiceQuestion";
import TabledTextQuestion from "./TabledTextQuestion";
import TabledRangeQuestion from "./TabledRangeQuestion";

const determineTabledComponent = (question: AllQuestionsType): JSX.Element => {
    switch (question.type) {
        case questionTypes.single:
            return <TabledSingleChoiceQuestion key={question.id} question={question} />;
        case questionTypes.multiple:
            return <TabledMultipleChoiceQuestion key={question.id} question={question} />;
        case questionTypes.text:
            return <TabledTextQuestion key={question.id} question={question} />;
        case questionTypes.range:
            return <TabledRangeQuestion key={question.id} question={question} />;
    }
};

type PropsType = {
    group: QuestionGroup;
};

// TODO: add this component to storybook
const QuestionTable = (props: PropsType): JSX.Element => {
    const { group } = props;
    return (
        <Table>
            {group.tableInputHeadings && (
                <HeadingCell>
                    {group.tableInputHeadings.map((heading) => (
                        <div key={heading}>{heading}</div>
                    ))}
                </HeadingCell>
            )}
            {group.questions.map(determineTabledComponent)}
        </Table>
    );
};

export default QuestionTable;
