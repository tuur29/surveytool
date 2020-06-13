import React, { useState } from "react";
import { SingleChoiceQuestionType } from "../../types/ConfigTypes";
import { Wrapper, Title } from "../styles/Questions";
import { Checkbox, Label } from "../styles/Checkbox";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const [checked, setChecked] = useState(question.checkedByDefault || false);

    return (
        <Wrapper>
            <Label onClick={() => setChecked(!checked)}>
                <Checkbox checked={checked} />
                <Title>{question.title}</Title>
            </Label>
        </Wrapper>
    );
};

export default SingleChoiceQuestion;
