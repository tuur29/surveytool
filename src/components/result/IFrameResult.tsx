/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStoreSelector } from "../../redux/store";
import { ResultIFrameType } from "../../types/ResultTypes";
import { replaceValues } from "../../utils/utils";
import { IFrame } from "../styles/IFrame";
import { Result } from "../styles/Result";

type PropsType = {
    config: ResultIFrameType;
};

const IFrameResult = (props: PropsType): JSX.Element => {
    const { config } = props;
    const score = useStoreSelector((state) => state.result.score);
    const scoreUrl = replaceValues(config.url, { score })!;

    // use a debounced callback to avoid constantly reloading the iframe when changing a submitted result
    const [debouncedUrl, setDebouncedUrl] = useState(scoreUrl);
    const debouncedSetter = useCallback(
        debounce((url: string) => setDebouncedUrl(url), 500),
        [],
    );
    useEffect(() => {
        debouncedSetter(scoreUrl);
    }, [scoreUrl, debouncedSetter]);

    return useMemo(
        () => (
            <Result>
                <IFrame
                    title="Results"
                    src={debouncedUrl}
                    height={config.height || 400}
                    scrolling={config.disableScroll ? "no" : undefined}
                />
            </Result>
        ),
        [debouncedUrl, config],
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const IFrameResultDoc = (props: Omit<ResultIFrameType, "type">): null => props && null;

export default IFrameResult;
