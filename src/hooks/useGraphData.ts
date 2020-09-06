import { useState, useEffect } from "react";
import { SeriesDataTypes } from "../types/DataTypes";

type DataType = {
    data: SeriesDataTypes | null;
    loading: boolean;
};

const useGraphData = (url: string, postData?: unknown): DataType => {
    const [data, setData] = useState<SeriesDataTypes | null>(null);
    const [loading, setLoading] = useState(false);

    const hash = JSON.stringify(postData);
    useEffect(() => {
        // TODO: add debounce around this
        // TODO: notify end user of errors
        const request = async () => {
            // execute request
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Could not retrieve graph data", response.status);
                return;
            }

            try {
                // format and validate result data
                const jsonData: SeriesDataTypes = await response.json();
                // if (!jsonData || jsonData.length < 1) {
                //     console.error("Retrieved data can not be rendered to a valid graph", jsonData);
                //     return;
                // }

                // set result
                setData(jsonData);
                setLoading(false);
            } catch (exception) {
                console.error("Retrieved data is not formatted correctly", exception);
            }
        };

        request();
    }, [url, hash]);

    return { data, loading };
};

export default useGraphData;
