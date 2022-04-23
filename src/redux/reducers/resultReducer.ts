import { generateShowResultStorageKey, isDev } from "../../utils/utils";
import { ResultActions } from "../actions/resultActions";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialResultState = {
    showResult: isDev()
        ? (JSON.parse(localStorage.getItem(generateShowResultStorageKey()) || "false") as boolean)
        : false, // remember setting for easier debugging
    score: 0,
    restartTimestamp: null as number | null,
};
export type ResultState = typeof initialResultState;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const resultReducer = (state: ResultState = initialResultState, action: ResultActions): ResultState => {
    switch (action.type) {
        case "RESULT_SET": {
            return {
                ...state,
                score: action.score,
            };
        }
        case "RESULT_SHOW": {
            // remember setting for easier debugging
            if (isDev()) localStorage.setItem(generateShowResultStorageKey(), JSON.stringify(action.visible));
            return {
                ...state,
                showResult: action.visible,
            };
        }
        case "RESULT_UPDATE_RESTART_TIMER": {
            return {
                ...state,
                restartTimestamp: action.timestamp,
            };
        }
        default: {
            return state;
        }
    }
};
