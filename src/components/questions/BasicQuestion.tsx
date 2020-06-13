import React from "react";
import { Question, Title } from "../styles/Questions";

type PropsType = {
    title: string;
};

// Only used for demo purposes
const BasicQuestion = (props: PropsType): JSX.Element => {
    const { title } = props;

    return <Question>
        <Title>
            {title}
        </Title>
    </Question>;
};

export default BasicQuestion;
