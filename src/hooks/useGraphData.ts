import { useState, useEffect } from "react";
import { SeriesDataTypes, AnswerPostData } from "../types/DataTypes";
import { replaceValues, fetchAnswerData } from "../utils/utils";
import { AnswerDataUrl } from "../types/ConfigTypes";
import { useStoreSelector } from "../redux/store";

type DataType = {
    data: SeriesDataTypes | null;
    loading: boolean;
};

const useGraphData = (url: AnswerDataUrl): DataType => {
    const score = useStoreSelector((state) => state.result.score);
    const answers = useStoreSelector((state) => state.answers.list);

    const [data, setData] = useState<SeriesDataTypes | null>(null);
    const [loading, setLoading] = useState(false);

    const postData: AnswerPostData = { score, answers };
    const hash = JSON.stringify(postData);

    // TODO: debounce this
    useEffect(
        () => {
            // execute request
            const request = async () => {
                setLoading(true);

                try {
                    const result = await fetchAnswerData<SeriesDataTypes>(replaceValues(url, { score })!, postData);

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
            };

            request();
        },
        500,
        [url, hash],
    );

    return { data, loading };
};

export default useGraphData;
