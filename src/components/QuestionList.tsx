import React from "react";
import { answerTypes, SingleChoiceQuestionType } from "../types/ConfigTypes";
import BasicQuestion from "./questions/BasicQuestion";
import { List } from "./styles/List";

const QuestionList = (): JSX.Element => {
    const list: SingleChoiceQuestionType[] = [
        { id: "1", type: answerTypes.single, title: "Hoe gaat het?" },
        { id: "2", type: answerTypes.single, title: "Wanneer is het eten klaar?" },
    ];

    return (
        <List>
            {list.map((item) => (
                <BasicQuestion key={item.id} title={item.title || ""} />
            ))}
        </List>
    );
};

export default QuestionList;
