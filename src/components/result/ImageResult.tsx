/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStoreSelector } from "../../redux/store";
import { ResultImageType } from "../../types/ResultTypes";
import { replaceValues } from "../../utils/utils";
import { Image } from "../styles/Image";
import { Result } from "../styles/Result";

type PropsType = {
    config: ResultImageType;
};

const ImageResult = (props: PropsType): JSX.Element => {
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
                <Image src={debouncedUrl} widthPercentage={config.size} alt={config.alt} />
            </Result>
        ),
        [debouncedUrl, config],
    );
};

// A quick way to get the doc-gen function of Storybook working correctly
export const ImageResultDoc = (props: ResultImageType): null => props && null;

export default ImageResult;
