import React, { useState } from "react";
import { SingleChoiceQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Questions";
import { Checkbox, Label } from "../styles/SingleChoice";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const [checked, setChecked] = useState(question.checkedByDefault || false);

    return (
        <Question>
            <Label onClick={() => setChecked(!checked)}>
                <Checkbox checked={checked} />
                <Title>{question.title}</Title>
            </Label>
        </Question>
    );
};

export default SingleChoiceQuestion;
