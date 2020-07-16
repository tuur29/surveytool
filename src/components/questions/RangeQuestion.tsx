import React from "react";
import { RangeQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Question";
import { useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { RangeAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";
import { RadioListWrapper, RadioButton, BottomLabel } from "../styles/Input";

type PropsType = {
    question: RangeQuestionType;
};

const RangeQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const { value } = useQuestionAnswer<RangeAnswerType>(question.id);

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

            {question.inputType === "slider" && (
                <Slider
                    min={question.min || 0}
                    max={question.max || 1}
                    value={value || 0}
                    step={question.step || 1}
                    direction={question.direction || "toRight"}
                    onChange={setValue}
                />
            )}

            {question.inputType === "radio" && (
                <RadioListWrapper>
                    {new Array(question.max - question.min + 1).fill(0).map((_, index) => {
                        if (question.step && index % question.step !== 0) return null;

                        const itemValue = question.min + index;
                        return (
                            <BottomLabel key={itemValue} onClick={() => setValue(itemValue)}>
                                <RadioButton checked={value === itemValue} />
                                <div>{itemValue}</div>
                            </BottomLabel>
                        );
                    })}
                </RadioListWrapper>
            )}
        </Question>
    );
};

export default RangeQuestion;
