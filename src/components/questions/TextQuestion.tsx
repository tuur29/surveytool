import React, { SyntheticEvent } from "react";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import useValidAnswer from "../../hooks/useValidAnswer";
import { setAnswer } from "../../redux/answersReducer";
import { useStoreDispatch } from "../../redux/store";
import { TextAnswerType } from "../../types/AnswerTypes";
import { TextQuestionType } from "../../types/QuestionTypes";
import { REGEX_NUMBER_ONLY } from "../../utils/validator";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError, TextField } from "../styles/Input";
import { Question, Title } from "../styles/Question";

// blocks users from entering
const hasForbiddenCharacter = (format: TextQuestionType["format"], value: string): boolean => {
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
    const value = useQuestionAnswer<TextAnswerType>(question.id).value;
    const { error, showError, setFocussed } = useValidAnswer(question);

    const onChange = (event: SyntheticEvent) => {
        const newValue = (event.target as HTMLInputElement).value;
        // only block forbidden characters when no custom validation is applied, just to keep all options open
        if (!question.customValidation && hasForbiddenCharacter(question.format, newValue)) return;

        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                value: newValue,
            }),
        );
    };

    return (
        <Question id={question.id}>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>

            <TextField
                value={value}
                placeholder={question.placeholder || ""}
                isError={showError}
                onChange={onChange}
                onBlur={setFocussed}
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
        </Question>
    );
};

export default TextQuestion;
