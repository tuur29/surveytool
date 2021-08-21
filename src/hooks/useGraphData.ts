/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { SeriesDataTypes, AnswerPostData } from "../types/DataTypes";
import { fetchAnswerData } from "../utils/utils";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { AnswerDataUrl } from "../types/ResultTypes";
import { messageTypes } from "../types/MessageTypes";
import { addMessages } from "../redux/actions/messagesActions";
import { useLabels } from "./useLabel";

type DataType = {
    data: SeriesDataTypes | null;
    loading: boolean;
};

const useGraphData = (postUrl: AnswerDataUrl): DataType => {
    const dispatch = useStoreDispatch();
    const configId = useStoreSelector((state) => state.config.id);
    const score = useStoreSelector((state) => state.result.score);
    const answers = useStoreSelector((state) => state.answers.list);

    const [title, description] = useLabels(["messageErrorTitle", "messageGraphDataError"]);

    const [data, setData] = useState<SeriesDataTypes | null>(null);
    const [loading, setLoading] = useState(true);

    // Create data to be sent and create an easy to check string version for refetching with useEffect
    const postData: AnswerPostData = { configId, score, answers };
    const hash = JSON.stringify(postData);

    // Create debounced request function to avoid spamming the endpoint when changing an already submitted result
    const request = useCallback(
        debounce(async (url: AnswerDataUrl, data: AnswerPostData) => {
            setLoading(true);

            const result = await fetchAnswerData<SeriesDataTypes>(url, data);

            // validate result data
            if (!result) {
                setData(null);
                setLoading(false);

                console.error("Could not retrieve graph data");
                dispatch(
                    addMessages([{ type: messageTypes.error, title: title || "", description: description || "" }]),
                );

                return;
            }

            // set result
            setData(result);
            setLoading(false);
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
