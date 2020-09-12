import React from "react";
import { resetAnswers } from "../../redux/answersReducer";
import { showResult } from "../../redux/resultReducer";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { AnswerDataUrl, ResultButtonType } from "../../types/ResultTypes";
import { fetchAnswerData, replaceValues } from "../../utils/utils";
import { Button, CenteredButtonWrapper } from "../styles/Button";

type PropsType = {
    config: ResultButtonType;
};

const ButtonResult = (props: PropsType): JSX.Element => {
    const { config } = props;

    const score = useStoreSelector((state) => state.result.score);
    const answers = useStoreSelector((state) => state.answers.list);
    const dispatch = useStoreDispatch();

    const onClick = (): void => {
        const url = replaceValues(config.url, { score })!;
        switch (config.function) {
            case "restart":
                window.scrollTo({ top: 0 });
                dispatch(showResult(false));
                dispatch(resetAnswers());
                break;
            case "postData":
                fetchAnswerData(config.url as AnswerDataUrl, {
                    score: score,
                    answers: answers,
                });
                break;
            case "link":
                if (config.openInTab) {
                    window.open(url);
                } else {
                    window.location.href = url;
                }
                break;
        }
    };

    return (
        <CenteredButtonWrapper mb={4}>
            <Button onClick={onClick}>{config.label}</Button>
        </CenteredButtonWrapper>
    );
};

export default ButtonResult;
