import React from "react";
import { RangeQuestionType } from "../../types/QuestionTypes";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import HintableLabel from "../common/HintableLabel";
import { RangeAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";
import RadioSlider from "../common/RadioSlider";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    getRangeQuestionDefaultProps,
} from "../../utils/utils";
import { TitleCell, InputCell } from "../styles/GroupTable";

type PropsType = {
    question: RangeQuestionType;
};

const TabledRangeQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useStoreSelector(getQuestionAnswerSelector<RangeAnswerType>(question));

    const sliderProps: React.ComponentProps<typeof Slider> | React.ComponentProps<typeof RadioSlider> = {
        ...getRangeQuestionDefaultProps(question, dispatch, value),
        disabled: disableControl,
    };

    return (
        <>
            <TitleCell>
                <HintableLabel label={question.title} hints={question.hints} />
            </TitleCell>

            <InputCell id={getQuestionScrollId(question)}>
                {question.inputType === "slider" && (
                    <Slider {...sliderProps} tickCount={question.tickCount} fullWidth />
                )}
                {question.inputType === "radio" && <RadioSlider {...sliderProps} />}
            </InputCell>
        </>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const RangeQuestionDoc = (props: RangeQuestionType): null => props && null;

export default TabledRangeQuestion;
