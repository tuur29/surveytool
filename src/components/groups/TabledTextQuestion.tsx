import React from "react";
import { useStoreDispatch, useStoreSelector, useTypedStore } from "../../redux/store";
import { TextAnswerType } from "../../types/AnswerTypes";
import { TextQuestionType } from "../../types/QuestionTypes";
import {
    disableControlsSelector,
    getQuestionAnswerSelector,
    getQuestionScrollId,
    onTextAnswerChange,
} from "../../utils/utils";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError, TextField } from "../styles/Input";
import { TitleCell, InputCell } from "../styles/GroupTable";
import { getValidAnswerData } from "../../utils/validator";

type PropsType = {
    question: TextQuestionType;
    accentColor?: string;
};

const TabledTextQuestion = (props: PropsType): JSX.Element => {
    const { question } = props;

    const dispatch = useStoreDispatch();
    const disableControl = useStoreSelector(disableControlsSelector);
    const { value } = useStoreSelector(getQuestionAnswerSelector<TextAnswerType>(question));

    const store = useTypedStore();
    const { error, showError, setFocussed } = getValidAnswerData(question, store);

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

            <InputCell id={getQuestionScrollId(question)} accentColor={props.accentColor} isRadioButtonSlider>
                <TextField
                    value={value}
                    placeholder={question.placeholder || ""}
                    isError={showError}
                    onChange={(event) => onTextAnswerChange(question, dispatch, event.target.value)}
                    onBlur={setFocussed}
                    disabled={disableControl}
                />
            </InputCell>
        </>
    );
};

export default TabledTextQuestion;
