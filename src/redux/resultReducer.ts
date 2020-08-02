/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialResultState = {
    showResult: false, // TODO: persist this to localstorage (for dev only?)
    score: 0,
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

export type ResultActions = ReturnType<typeof setResult> | ReturnType<typeof showResult>;

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
            return {
                ...state,
                showResult: action.visible,
            };
        }
        default: {
            return state;
        }
    }
};
