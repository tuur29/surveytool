import React from "react";
import { Question, Title } from "../styles/Question";

type PropsType = {
    title: string;
};

// Only used for demo purposes
const PlaceholderQuestion = (props: PropsType): JSX.Element => {
    const { title } = props;

    return <Question>
        <Title>
            {title}
        </Title>
    </Question>;
};

export default PlaceholderQuestion;
