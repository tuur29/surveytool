import React, { Fragment } from "react";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import useValidAnswer from "../../hooks/useValidAnswer";
import { setAnswer } from "../../redux/answersReducer";
import { useStoreDispatch } from "../../redux/store";
import { MultipleChoiceAnswerType } from "../../types/AnswerTypes";
import { MultipleChoiceQuestionType } from "../../types/ConfigTypes";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import Select from "../common/Select";
import { FieldError, Label, RadioButton } from "../styles/Input";
import { Question, Title } from "../styles/Question";

type PropsType = {
    question: MultipleChoiceQuestionType;
};

const MultipleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const selectedIds = useQuestionAnswer<MultipleChoiceAnswerType>(question.id).values;
    const { error, showError, setFocussed } = useValidAnswer(question);

    const select = (selectedId: string) => {
        let newValues: string[] = [];

        if (question.inputType === "radio") {
            newValues = selectedIds.includes(selectedId) ? ([] as string[]) : [selectedId];
        }

        if (question.inputType === "check") {
            newValues = selectedIds.includes(selectedId)
                ? selectedIds.filter((id) => id !== selectedId)
                : [...selectedIds, selectedId];
        }

        if (question.inputType === "select") {
            newValues = [selectedId];
        }

        setFocussed();
        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                values: newValues,
            }),
        );
    };

    return (
        <Question id={question.id}>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>

            {question.inputType === "radio" &&
                question.options.map((option) => (
                    <Fragment key={option.id}>
                        <Label onClick={() => select(option.id)}>
                            <RadioButton checked={selectedIds.includes(option.id)} />
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Label>
                    </Fragment>
                ))}

            {question.inputType === "check" &&
                question.options.map((option) => (
                    <Fragment key={option.id}>
                        <Label onClick={() => select(option.id)}>
                            <Checkbox checked={selectedIds.includes(option.id)} />
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Label>
                    </Fragment>
                ))}

            {question.inputType === "select" && (
                <Select options={question.options} selectedOptionId={selectedIds[0]} onSelectOption={select} />
            )}

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

export default MultipleChoiceQuestion;
