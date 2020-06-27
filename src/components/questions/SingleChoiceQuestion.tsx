import React from "react";
import { SingleChoiceQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Questions";
import { Checkbox, Label } from "../styles/SingleChoice";
import { useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";

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
                {/* fallback to false and add readOnly so React knows it's a controlled input */}
                <Checkbox checked={checked || false} readOnly />
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>
            </Label>
        </Question>
    );
};

export default SingleChoiceQuestion;
