import React, { Fragment } from "react";
import { MultipleChoiceQuestionType } from "../../types/ConfigTypes";
import { Question, Title } from "../styles/Questions";
import { useStoreDispatch } from "../../redux/store";
import { setAnswer } from "../../redux/answersReducer";
import HintableLabel from "../common/HintableLabel";
import useQuestionAnswer from "../../hooks/useQuestionAnswer";
import { RadioButton, Label, Checkbox } from "../styles/Input";
import { MultipleChoiceAnswerType } from "../../types/AnswerTypes";
import Select from "../common/Select";

type PropsType = {
    question: MultipleChoiceQuestionType;
};

const MultipleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const selectedIds = useQuestionAnswer<MultipleChoiceAnswerType>(question.id).values;

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

        dispatch(
            setAnswer({
                questionId: question.id,
                type: question.type,
                values: newValues,
            }),
        );
    };

    return (
        <Question>
            <Title>
                <HintableLabel label={question.title} hints={question.hints} />
            </Title>

            {question.inputType === "radio" &&
                question.answers.map((answer) => (
                    <Fragment key={answer.id}>
                        <Label onClick={() => select(answer.id)}>
                            <RadioButton checked={selectedIds.includes(answer.id)} />
                            <HintableLabel label={answer.title} hints={answer.hints} />
                        </Label>
                    </Fragment>
                ))}

            {question.inputType === "check" &&
                question.answers.map((answer) => (
                    <Fragment key={answer.id}>
                        <Label onClick={() => select(answer.id)}>
                            <Checkbox checked={selectedIds.includes(answer.id)} />
                            <HintableLabel label={answer.title} hints={answer.hints} />
                        </Label>
                    </Fragment>
                ))}

            {question.inputType === "select" && (
                <Select options={question.answers} selectedOptionId={selectedIds[0]} onSelectOption={select} />
            )}
        </Question>
    );
};

export default MultipleChoiceQuestion;
