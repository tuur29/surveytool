import { useState, useEffect } from "react";
import { SeriesTypes } from "../types/DataTypes";

type DataType = {
    series: SeriesTypes[];
    loading: boolean;
};

const useGraphData = (url: string, postData?: unknown): DataType => {
    const [series, setSeries] = useState<SeriesTypes[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // TODO: add debounce around this
        // TODO: notify end user of errors
        const request = async() => {
            // execute request
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Could not retrieve graph data", response.status);
                return;
            }
            
            try {
                // format and validate result data
                const jsonData: SeriesTypes[] = await response.json();
                if (!jsonData || jsonData.length < 1) {
                    console.error("Retrieved data can not be rendered to a valid graph", jsonData);
                    return;
                }
        
                // set result
                setSeries(jsonData);
                setLoading(false);

            } catch (exception) {
                console.error("Retrieved data is not formatted correctly", exception);
            }
        }

        request();
    }, [url, JSON.stringify(postData)]);

    return { series, loading };
};

export default useGraphData;
