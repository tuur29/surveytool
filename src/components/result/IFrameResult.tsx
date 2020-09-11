import React, { useMemo } from "react";
import { useStoreSelector } from "../../redux/store";
import { ResultIFrameType } from "../../types/ResultTypes";
import { replaceValues } from "../../utils/utils";
import { IFrame } from "../styles/IFrame";

type PropsType = {
    config: ResultIFrameType;
};

const IFrameResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const url = replaceValues(config.url, { score })!;

    return useMemo(
        () => (
            <IFrame
                title="Results"
                src={url}
                height={config.height || 400}
                scrolling={config.disableScroll ? "no" : undefined}
            />
        ),
        [url],
    );
};

export default IFrameResult;
