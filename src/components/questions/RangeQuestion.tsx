import React from "react";
import { RangeQuestionType } from "../../types/QuestionTypes";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import HintableLabel from "../common/HintableLabel";
import { RangeAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";
import RadioSlider from "../common/RadioSlider";
import { disableControlsSelector, getQuestionAnswerSelector } from "../../utils/utils";
import { setAnswer } from "../../redux/actions/answersActions";

type PropsType = {
    question: RangeQuestionType;
};

const RangeQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useStoreSelector(getQuestionAnswerSelector<RangeAnswerType>(question.id));

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
        <Question id={question.id} imagePosition={question.image ? question.image.alignment || "right" : undefined}>
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <div>
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>

                {question.inputType === "slider" && <Slider {...sliderProps} tickCount={question.tickCount} />}
                {question.inputType === "radio" && <RadioSlider {...sliderProps} />}
            </div>
        </Question>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const RangeQuestionDoc = (props: RangeQuestionType): null => props && null;

export default RangeQuestion;
