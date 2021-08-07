import React, { ChangeEvent } from "react";
import getValidAnswerData from "../../utils/validateAnswer";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { TextAnswerType } from "../../types/AnswerTypes";
import { TextQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onTextAnswerChange,
} from "../../utils/utils";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError, TextField, TextFieldWrapper } from "../styles/Input";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";

type PropsType = {
    question: TextQuestionType;
};

const TextQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useStoreSelector(getQuestionAnswerSelector<TextAnswerType>(question));

    const store = useTypedStore();
    const { error, showError, setFocussed } = getValidAnswerData(question, store);

    return (
        <Question
            id={getQuestionScrollId(question)}
            imagePosition={question.image ? question.image.alignment || "right" : undefined}
        >
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <TextFieldWrapper>
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>

                <TextField
                    value={value}
                    placeholder={question.placeholder || ""}
                    isError={showError}
                    onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onTextAnswerChange(question, dispatch, event.target.value)
                    }
                    onBlur={setFocussed}
                    disabled={disableControl}
                    as={(question.rowCount || 1) > 1 ? "textarea" : undefined}
                    rows={question.rowCount}
                />

                {/* always render FieldError with min-height so showing the error doesn't move content on the page */}
                <FieldError>
                    {showError && (
                        <>
                            <Icon type="error" color="error" />
                            {error}
                        </>
                    )}
                </FieldError>
            </TextFieldWrapper>
        </Question>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const TextQuestionDoc = (props: TextQuestionType): null => props && null;

export default TextQuestion;
