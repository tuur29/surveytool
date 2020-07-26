/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialResultState = {
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

export type ResultActions = ReturnType<typeof setResult>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const ResultReducer = (state: ResultState = initialResultState, action: ResultActions): ResultState => {
    switch (action.type) {
        case "RESULT_SET": {
            return {
                ...state,
                score: action.score,
            };
        }
        default: {
            return state;
        }
    }
};
