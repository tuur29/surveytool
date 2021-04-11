import React from "react";
import getValidAnswerData from "../../utils/validateAnswer";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import { SingleChoiceQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onSingleAnswerClick,
} from "../../utils/utils";
import Checkbox from "../common/Checkbox";
import Icon from "../common/Icon";
import { FieldError } from "../styles/Input";
import HintableLabel from "../common/HintableLabel";
import { TitleCell, InputCell } from "../styles/GroupTable";

type PropsType = {
    question: SingleChoiceQuestionType;
};

const TabledSingleChoiceQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const checked = useStoreSelector(getQuestionAnswerSelector<SingleChoiceAnswerType>(question)).value;

    const store = useTypedStore();
    const { error, showError } = getValidAnswerData(question, store);

    return (
        <>
            <TitleCell>
                <HintableLabel label={question.title} hints={question.hints} />
            </TitleCell>
            <InputCell id={getQuestionScrollId(question)}>
                <Checkbox
                    checked={checked || false}
                    disabled={disableControl}
                    onClick={() => onSingleAnswerClick(question, dispatch, !checked)}
                />

                {/* Always render FieldError with min-height so showing the error doesn't move content on the page */}
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

export default TabledSingleChoiceQuestion;
