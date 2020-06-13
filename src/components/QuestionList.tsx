import React from "react";
import BasicQuestion from "./questions/BasicQuestion";
import { List } from "./styles/List";
import useConfig from "../hooks/useConfig";

const QuestionList = (): JSX.Element | null => {
    const config = useConfig();

    // TODO: show loader
    if (!config) return null;

    return (
        <List>
            {config.questions.map((item) => (
                <BasicQuestion key={item.id} title={item.title || ""} />
            ))}
        </List>
    );
};

export default QuestionList;
