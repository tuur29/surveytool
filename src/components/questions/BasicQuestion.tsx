import React from "react";
import { Wrapper, Title } from "../styles/Questions";

type PropsType = {
    title: string;
};

// Only used for demo purposes
const BasicQuestion = (props: PropsType): JSX.Element => {
    const { title } = props;

    return <Wrapper>
        <Title>
            {title}
        </Title>
    </Wrapper>;
};

export default BasicQuestion;
