import React, { SyntheticEvent, useState } from "react";
import { TextQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Question";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { TextField, FieldError } from "../styles/Input";
import { TextAnswerType } from "../../types/AnswerTypes";
import useLabel from "../../hooks/useLabel";
import { LabelType } from "../../utils/labels";
import Icon from "../common/Icon";

// eslint-disable-next-line
const REGEX_EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // https://emailregex.com/
const REGEX_NUMBER_ONLY = /^[0-9]*$/;

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

const isValueInvalid = (format: TextQuestionType["format"], value: string): boolean => {
    switch (format) {
        case "number":
            return !value.match(REGEX_NUMBER_ONLY);
        case "email":
            return !value.match(REGEX_EMAIL_FORMAT);
        case "text":
            return false;
    }
};

const errorLabelMap: { [format in TextQuestionType["format"]]: LabelType } = {
    number: "inputTextErrorNumber",
    email: "inputTextErrorEmail",
    text: "inputTextErrorText",
};

type PropsType = {
    question: TextQuestionType;
};

const TextQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const loadedFromMemory = useStoreSelector((state) => state.answers.loadedFromStorage);
    const { value } = useQuestionAnswer<TextAnswerType>(question.id);

    const [focussed, setFocussed] = useState(loadedFromMemory);

    const errorLabel = useLabel(errorLabelMap[question.format]);
    const invalid = question.customValidation?.regex
        ? !value.match(question.customValidation.regex)
        : isValueInvalid(question.format, value);

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
        <Question>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>

            <TextField
                value={value}
                placeholder={question.placeholder}
                onChange={onChange}
                onBlur={() => setFocussed(true)}
            />

            {/* always render FieldError with min-height so showing the error doesn't move content on the page */}
            <FieldError>
                {invalid && focussed && value && (
                    <>
                        <Icon type="error" color="error" />
                        {question.customValidation?.error || errorLabel}
                    </>
                )}
            </FieldError>
        </Question>
    );
};

export default TextQuestion;
