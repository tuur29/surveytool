import React, { useEffect, useState } from "react";
import { useRestartTimer } from "../../hooks/timerHooks";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { AnswerDataUrl, ResultButtonType } from "../../types/ResultTypes";
import { fetchAnswerData, replaceValues, resetFormDispatcher } from "../../utils/utils";
import Icon from "../common/Icon";
import { Button, CenteredButtonWrapper } from "../styles/Button";
import { Loader } from "../styles/Loader";

type PropsType = {
    config: ResultButtonType;
};

const ButtonResult = (props: PropsType): JSX.Element => {
    const { config } = props;

    const configId = useStoreSelector((state) => state.config.id);
    const score = useStoreSelector((state) => state.result.score);
    const answers = useStoreSelector((state) => state.answers.list);
    const dispatch = useStoreDispatch();

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const countdown = useRestartTimer();
    const label = replaceValues(config.label, { countdown, score });
    const hash = JSON.stringify(answers);

    const onClick = async (): Promise<void> => {
        const url = replaceValues(config.url, { score })!;
        switch (config.function) {
            case "restart":
                resetFormDispatcher(dispatch);
                break;
            case "postData":
                setLoading(true);
                await fetchAnswerData(config.url as AnswerDataUrl, { configId, score, answers });
                setLoading(false);
                setLoaded(true);
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

    useEffect(() => {
        setLoading(false);
        setLoaded(false);
    }, [score, hash]);

    return (
        <CenteredButtonWrapper mb={4}>
            <Button onClick={onClick} disabled={loading || loaded} iconAlign="right">
                {label}
                {loading && <Loader size={12} />}
                {loaded && <Icon type="check" />}
            </Button>
        </CenteredButtonWrapper>
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const ButtonResultDoc = (props: Omit<ResultButtonType, "type">): null => props && null;

export default ButtonResult;
