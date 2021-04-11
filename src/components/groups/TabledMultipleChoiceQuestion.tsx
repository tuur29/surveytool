import React, { Fragment } from "react";
import getValidAnswerData from "../../utils/validateAnswer";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { MultipleChoiceAnswerType } from "../../types/AnswerTypes";
import { MultipleChoiceQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onMultipleAnswerClick,
} from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import Select from "../common/Select";
import { FieldError, Label, RadioButton } from "../styles/Input";
import { TitleCell, InputCell } from "../styles/GroupTable";

type PropsType = {
    question: MultipleChoiceQuestionType;
};

const TabledMultipleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const selectedIds = useStoreSelector(getQuestionAnswerSelector<MultipleChoiceAnswerType>(question)).values;

    const store = useTypedStore();
    const { error, showError } = getValidAnswerData(question, store);

    return (
        <>
            <TitleCell>
                <HintableLabel label={question.title} hints={question.hints} />
            </TitleCell>

            <InputCell id={getQuestionScrollId(question)}>
                {question.inputType === "radio" &&
                    question.options.map((option) => (
                        <Fragment key={option.id}>
                            <Label
                                onClick={() => onMultipleAnswerClick(question, dispatch, selectedIds, option.id)}
                                disabled={disableControl}
                            >
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
                                onClick={() => onMultipleAnswerClick(question, dispatch, selectedIds, option.id)}
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
                        onSelectOption={(value) => onMultipleAnswerClick(question, dispatch, selectedIds, value)}
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
            </InputCell>
        </>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const MultipleChoiceQuestionDoc = (props: MultipleChoiceQuestionType): null => props && null;

export default TabledMultipleChoiceQuestion;
