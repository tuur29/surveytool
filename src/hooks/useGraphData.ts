import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { SeriesDataTypes, AnswerPostData } from "../types/DataTypes";
import { fetchAnswerData } from "../utils/utils";
import { useStoreSelector } from "../redux/store";
import { AnswerDataUrl } from "../types/ResultTypes";

type DataType = {
    data: SeriesDataTypes | null;
    loading: boolean;
};

const useGraphData = (postUrl: AnswerDataUrl): DataType => {
    const score = useStoreSelector((state) => state.result.score);
    const answers = useStoreSelector((state) => state.answers.list);

    const [data, setData] = useState<SeriesDataTypes | null>(null);
    const [loading, setLoading] = useState(false);

    // Create data to be sent and create an easy to check string version for refetching with useEffect
    const postData: AnswerPostData = { score, answers };
    const hash = JSON.stringify(postData);

    // Create debounced request function
    const request = useCallback(
        debounce(async (url: AnswerDataUrl, data: AnswerPostData) => {
            setLoading(true);

            try {
                const result = await fetchAnswerData<SeriesDataTypes>(url, data);

                // TODO: improve graph data validation and notify user on error (hide graph?)
                // validate result data
                if (!result) {
                    console.error("Could not retrieve graph data");
                    return;
                }

                // set result
                setData(result);
                setLoading(false);
            } catch (exception) {
                console.error("Retrieved data is not formatted correctly", exception);
            }
        }, 500),
        [],
    );

    useEffect(() => {
        request(postUrl, postData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postUrl, hash]);

    return { data, loading };
};

export default useGraphData;
