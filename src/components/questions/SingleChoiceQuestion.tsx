import React from "react";
import getValidAnswerData from "../../utils/validateAnswer";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import { SingleChoiceQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onSingleAnswerClick,
} from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError } from "../styles/Input";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const checked = useStoreSelector(getQuestionAnswerSelector<SingleChoiceAnswerType>(question)).value;

    const store = useTypedStore();
    const { error, showError } = getValidAnswerData(question, store);

    return (
        <Question
            id={getQuestionScrollId(question)}
            imagePosition={question.image ? question.image.alignment || "left" : undefined}
        >
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <div>
                <Checkbox
                    checked={checked || false}
                    disabled={disableControl}
                    onClick={() => onSingleAnswerClick(question, dispatch, !checked)}
                >
                    <Title>
                        <HintableLabel label={question.title} hints={question.hints} />
                    </Title>
                </Checkbox>

                {/* always render FieldError with min-height so showing the error doesn't move content on the page */}
                <FieldError>
                    {showError && (
                        <>
                            <Icon type="error" color="error" />
                            {error}
                        </>
                    )}
                </FieldError>
            </div>
        </Question>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const SingleChoiceQuestionDoc = (props: SingleChoiceQuestionType): null => props && null;

export default SingleChoiceQuestion;
