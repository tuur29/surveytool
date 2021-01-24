import React from "react";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import useValidAnswer from "../../hooks/useValidAnswer";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import { SingleChoiceQuestionType } from "../../types/QuestionTypes";
import { disableControlsSelector } from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError } from "../styles/Input";
import { Question, Image, Title } from "../styles/Question";
import { setAnswer } from "../../redux/actions/answersActions";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const SingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const checked = useQuestionAnswer<SingleChoiceAnswerType>(question.id).value;
    const { error, showError, setFocussed } = useValidAnswer(question);

    const check = () => {
        if (disableControl) return;
        setFocussed();
        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                value: !checked,
            }),
        );
    };

    return (
        <Question id={question.id} imagePosition={question.image ? question.image.alignment || "left" : undefined}>
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <div>
                <Checkbox checked={checked || false} onClick={check} disabled={disableControl}>
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
export const SingleChoiceQuestionDoc = (props: Omit<SingleChoiceQuestionType, "type" | "id">): null => props && null;

export default SingleChoiceQuestion;
