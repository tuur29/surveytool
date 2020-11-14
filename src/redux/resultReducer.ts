/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring

import { generateShowResultStorageKey } from "../utils/utils";
import { isDev } from "../utils/devUtils";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialResultState = {
    showResult: isDev() ? JSON.parse(localStorage.getItem(generateShowResultStorageKey()) || "false") : false, // remember setting for easier debugging
    score: 0,
    restartTimestamp: null as number | null,
};
export type ResultState = typeof initialResultState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const setResult = (score: number) => ({
    type: "RESULT_SET" as const,
    score,
});

export const showResult = (visible = true) => ({
    type: "RESULT_SHOW" as const,
    visible,
});

export const updateRestartTimer = (timestamp: number | null) => ({
    type: "RESULT_UPDATE_RESTART_TIMER" as const,
    timestamp,
});

export type ResultActions =
    | ReturnType<typeof setResult>
    | ReturnType<typeof showResult>
    | ReturnType<typeof updateRestartTimer>;

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
