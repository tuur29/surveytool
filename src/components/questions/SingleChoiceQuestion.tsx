import React from "react";
import { SingleChoiceQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Questions";
import { Checkbox, Label } from "../styles/SingleChoice";
import { useStore, useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const stateValue = useStore(
        // TODO: put this in a util or hook?
        (state) => state.answers.list.find((answer) => answer.questionId === question.id)?.value as boolean,
    );

    const checked = stateValue !== undefined ? stateValue : question.checkedByDefault; // fallback to default

    const check = () => {
        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                value: !checked,
            }),
        );
    };

    return (
        <Question>
            <Label onClick={check}>
                {/* fallback to false and add readOnly so React knows it's a controlled input */}
                <Checkbox checked={checked || false} readOnly />
                <Title>{question.title}</Title>
            </Label>
        </Question>
    );
};

export default SingleChoiceQuestion;
