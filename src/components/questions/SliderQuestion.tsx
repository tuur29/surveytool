import React from "react";
import { SliderQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Question";
import { useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { SliderAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";

type PropsType = {
    question: SliderQuestionType;
};

const SliderQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const { value } = useQuestionAnswer<SliderAnswerType>(question.id);

    const setValue = (newValue: number) => {
        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                value: newValue,
            }),
        );
    };

    return (
        <Question>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>
            <Slider
                min={question.min || 0}
                max={question.max || 1}
                value={value || question.default || 0}
                step={question.step || 1}
                direction={question.direction || "toRight"}
                onChange={setValue}
            />
        </Question>
    );
};

export default SliderQuestion;
