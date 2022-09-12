import React from "react";
import { RangeQuestionType } from "../../types/QuestionTypes";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import HintableLabel from "../common/HintableLabel";
import { RangeAnswerType } from "../../types/AnswerTypes";
import Slider from "../common/Slider";
import RadioSlider from "../common/RadioSlider";
import {
    disableControlsSelector,
    getImageAlignment,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    getRangeQuestionDefaultProps,
} from "../../utils/utils";
import { useBreakpoint } from "../../hooks/windowHooks";

type PropsType = {
    question: RangeQuestionType;
};

const RangeQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useStoreSelector(getQuestionAnswerSelector<RangeAnswerType>(question));

    const sliderProps: React.ComponentProps<typeof Slider> | React.ComponentProps<typeof RadioSlider> = {
        ...getRangeQuestionDefaultProps(question, dispatch, value),
        disabled: disableControl,
    };

    const isMobile = useBreakpoint("md", "max", true);

    return (
        <Question id={getQuestionScrollId(question)} imagePosition={getImageAlignment(question.image, isMobile)}>
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
