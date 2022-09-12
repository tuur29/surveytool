import React from "react";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { MultipleChoiceAnswerType } from "../../types/AnswerTypes";
import { MultipleChoiceQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getImageAlignment,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onMultipleAnswerClick,
} from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import Select from "../common/Select";
import { FieldError, Label, RadioButton } from "../styles/Input";
import { Question, Title } from "../styles/Question";
import { Image } from "../styles/Image";
import { getValidAnswerData } from "../../utils/validator";
import { useBreakpoint } from "../../hooks/windowHooks";

type PropsType = {
    question: MultipleChoiceQuestionType;
};

const MultipleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;
    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const selectedIds = useStoreSelector(getQuestionAnswerSelector<MultipleChoiceAnswerType>(question)).values;

    const store = useTypedStore();
    const { error, showError } = getValidAnswerData(question, store);

    const isMobile = useBreakpoint("md", "max", true);

    return (
        <Question id={getQuestionScrollId(question)} imagePosition={getImageAlignment(question.image, isMobile)}>
            {question.image && (
                <Image src={question.image.url} widthPercentage={question.image.size} alt={question.image.alt} />
            )}

            <div>
                <Title>
                    <HintableLabel label={question.title} hints={question.hints} />
                </Title>

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
export const MultipleChoiceQuestionDoc = (props: MultipleChoiceQuestionType): null => props && null;

export default MultipleChoiceQuestion;
