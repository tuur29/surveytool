import React from "react";
import { QuestionGroup, questionTypes } from "../../types/QuestionTypes";
import { HeadingCell, InputCell, Table } from "../styles/GroupTable";
import TabledSingleChoiceQuestion from "./TabledSingleChoiceQuestion";
import TabledMultipleChoiceQuestion from "./TabledMultipleChoiceQuestion";
import TabledTextQuestion from "./TabledTextQuestion";
import TabledRangeQuestion from "./TabledRangeQuestion";

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

            {group.questions.map((question) => {
                switch (question.type) {
                    case questionTypes.single:
                        return (
                            <TabledSingleChoiceQuestion
                                key={question.id}
                                question={question}
                                accentColor={group.accentColor}
                            />
                        );
                    case questionTypes.multiple:
                        return (
                            <TabledMultipleChoiceQuestion
                                key={question.id}
                                question={question}
                                accentColor={group.accentColor}
                            />
                        );
                    case questionTypes.text:
                        return (
                            <TabledTextQuestion key={question.id} question={question} accentColor={group.accentColor} />
                        );
                    case questionTypes.range:
                        return (
                            <TabledRangeQuestion
                                key={question.id}
                                question={question}
                                accentColor={group.accentColor}
                            />
                        );
                    default:
                        return null;
                }
            })}
            {/* Sneaky bottom margin without breaking the row alignment */}
            <InputCell />
        </Table>
    );
};

export default QuestionTable;
