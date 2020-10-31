import React from "react";
import { RangeQuestionType } from "../../types/QuestionTypes";
import { Question, Title } from "../styles/Question";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { RangeAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";
import RadioSlider from "../common/RadioSlider";
import { disableControlsSelector } from "../../utils/utils";

type PropsType = {
    question: RangeQuestionType;
};

const RangeQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useQuestionAnswer<RangeAnswerType>(question.id);

    const setValue = (newValue: number) => {
        if (disableControl) return;
        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                value: newValue,
            }),
        );
    };

    const sliderProps: React.ComponentProps<typeof Slider> | React.ComponentProps<typeof RadioSlider> = {
        min: question.min || 0,
        max: question.max || 1,
        value: value || 0,
        step: question.step || 1,
        disabled: disableControl,
        onChange: setValue,
        direction: question.direction || "increase",
        tickCount: question.tickCount,
        tickValues: question.tickValues,
        tickLabels: question.tickLabels,
    };

    return (
        <Question id={question.id}>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>

            {question.inputType === "slider" && <Slider {...sliderProps} tickCount={question.tickCount} />}
            {question.inputType === "radio" && <RadioSlider {...sliderProps} />}
        </Question>
    );
};

export default RangeQuestion;
