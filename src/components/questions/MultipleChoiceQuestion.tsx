import React, { Fragment } from "react";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import useValidAnswer from "../../hooks/useValidAnswer";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { MultipleChoiceAnswerType } from "../../types/AnswerTypes";
import { MultipleChoiceQuestionType } from "../../types/QuestionTypes";
import { disableControlsSelector } from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import Select from "../common/Select";
import { FieldError, Label, RadioButton } from "../styles/Input";
import { Question, Title } from "../styles/Question";
import { setAnswer } from "../../redux/actions/answersActions";

type PropsType = {
    question: MultipleChoiceQuestionType;
};

const MultipleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const selectedIds = useQuestionAnswer<MultipleChoiceAnswerType>(question.id).values;
    const { error, showError, setFocussed } = useValidAnswer(question);

    const select = (selectedId: string) => {
        if (disableControl) return;
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
                        <Label onClick={() => select(option.id)} disabled={disableControl}>
                            <RadioButton checked={selectedIds.includes(option.id)} />
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Label>
                    </Fragment>
                ))}

            {question.inputType === "check" &&
                question.options.map((option) => (
                    <Fragment key={option.id}>
                        <Checkbox
                            checked={selectedIds.includes(option.id)}
                            onClick={() => select(option.id)}
                            disabled={disableControl}
                        >
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Checkbox>
                    </Fragment>
                ))}

            {question.inputType === "select" && (
                <Select
                    options={question.options}
                    selectedOptionId={selectedIds[0]}
                    onSelectOption={select}
                    disabled={disableControl}
                />
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

// A quick way to get the doc-gen function of Storybook working correctly
export const MultipleChoiceQuestionDoc = (props: Omit<MultipleChoiceQuestionType, "type">): null => props && null;

export default MultipleChoiceQuestion;
