import React from "react";
import { SingleChoiceQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Question";
import { Label } from "../styles/Input";
import { useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import Checkbox from "../common/Checkbox";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const checked = useQuestionAnswer<SingleChoiceAnswerType>(question.id).value;

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
                <Checkbox checked={checked || false} />
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>
            </Label>
        </Question>
    );
};

export default SingleChoiceQuestion;
