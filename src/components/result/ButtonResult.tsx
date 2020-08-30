import React from "react";
import { resetAnswers } from "../../redux/answersReducer";
import { showResult } from "../../redux/resultReducer";
import { useStoreDispatch } from "../../redux/store";
import { ResultButtonType } from "../../types/ResultTypes";
import { Button, CenteredButtonWrapper } from "../styles/Button";

type PropsType = {
    config: ResultButtonType;
};

const ButtonResult = (props: PropsType): JSX.Element => {
    const { config } = props;

    const dispatch = useStoreDispatch();

    const restartAnswers = (): void => {
        dispatch(resetAnswers());
        dispatch(showResult(false));
    };

    return (
        <CenteredButtonWrapper mb={4}>
            <Button onClick={restartAnswers}>{config.label}</Button>
        </CenteredButtonWrapper>
    );
};

export default ButtonResult;
