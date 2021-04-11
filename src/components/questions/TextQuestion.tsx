import React, { SyntheticEvent } from "react";
import getValidAnswerData from "../../utils/validateAnswer";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { TextAnswerType } from "../../types/AnswerTypes";
import { TextQuestionType } from "../../types/QuestionTypes";
import { disableControlsSelector, getQuestionAnswerSelector, getQuestionIdHash } from "../../utils/utils";
import { REGEX_NUMBER_ONLY } from "../../utils/validator";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError, TextField } from "../styles/Input";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";
import { setAnswer } from "../../redux/actions/answersActions";

// blocks users from entering
const hasForbiddenCharacter = (format: TextQuestionType["inputType"], value: string): boolean => {
    switch (format) {
        case "number":
            return !value.match(REGEX_NUMBER_ONLY);
        case "email":
            return value.includes(" "); // no spaces allowed
        case "text":
            return false; // everything is allowed
    }
};

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

    const onChange = (event: SyntheticEvent) => {
        const newValue = (event.target as HTMLInputElement).value;
        // only block forbidden characters when no custom validation is applied, just to keep all options open
        if (!question.customValidation && hasForbiddenCharacter(question.inputType, newValue)) return;

        dispatch(
            setAnswer({
                questionIdHash: getQuestionIdHash(question),
                type: question.type,
                value: newValue,
            }),
        );
    };

    return (
        <Question
            id={`question-${getQuestionIdHash(question)}`}
            imagePosition={question.image ? question.image.alignment || "right" : undefined}
        >
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <div>
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>

                <TextField
                    value={value}
                    placeholder={question.placeholder || ""}
                    isError={showError}
                    onChange={onChange}
                    onBlur={setFocussed}
                    disabled={disableControl}
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
            </div>
        </Question>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const TextQuestionDoc = (props: TextQuestionType): null => props && null;

export default TextQuestion;
