import React from "react";
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
import { getValidAnswerData } from "../../utils/validator";

type PropsType = {
    question: SingleChoiceQuestionType;
    accentColor?: string;
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

                {showError && (
                    <FieldError>
                        <Icon type="error" color="error" />
                        {error}
                    </FieldError>
                )}
            </TitleCell>

            <InputCell id={getQuestionScrollId(question)} isRadioButtonSlider accentColor={props.accentColor}>
                <Checkbox
                    checked={checked || false}
                    disabled={disableControl}
                    onClick={() => onSingleAnswerClick(question, dispatch, !checked)}
                />
            </InputCell>
        </>
    );
};

export default TabledSingleChoiceQuestion;
