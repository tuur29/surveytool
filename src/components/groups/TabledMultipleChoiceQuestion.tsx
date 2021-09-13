import React from "react";
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

                {showError && (
                    <FieldError>
                        <Icon type="error" color="error" />
                        {error}
                    </FieldError>
                )}
            </TitleCell>

            <InputCell id={getQuestionScrollId(question)} isRadioButtonSlider>
                {question.inputType === "radio" &&
                    question.options.map((option) => (
                        <Label
                            key={option.id}
                            onClick={() =>
                                !disableControl && onMultipleAnswerClick(question, dispatch, selectedIds, option.id)
                            }
                            disabled={disableControl}
                        >
                            <RadioButton checked={selectedIds.includes(option.id)} />
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Label>
                    ))}

                {question.inputType === "check" &&
                    question.options.map((option) => (
                        <Checkbox
                            key={option.id}
                            checked={selectedIds.includes(option.id)}
                            onClick={() => onMultipleAnswerClick(question, dispatch, selectedIds, option.id)}
                            disabled={disableControl}
                        >
                            <HintableLabel label={option.title} hints={option.hints} />
                        </Checkbox>
                    ))}

                {question.inputType === "select" && (
                    <Select
                        options={question.options}
                        selectedOptionId={selectedIds[0]}
                        onSelectOption={(value) => onMultipleAnswerClick(question, dispatch, selectedIds, value)}
                        disabled={disableControl}
                    />
                )}
            </InputCell>
        </>
    );
};

export default TabledMultipleChoiceQuestion;
