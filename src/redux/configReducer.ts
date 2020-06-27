/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { ConfigType } from "../types/ConfigTypes";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialConfigState: ConfigType = {
    questions: []
};
export type ConfigState = typeof initialConfigState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const initConfig = (config: ConfigType) => ({
    type: "CONFIG_INIT" as const,
    config,
});

export type ConfigActions = ReturnType<typeof initConfig>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const configReducer = (state: ConfigState = initialConfigState, action: ConfigActions): ConfigState => {
    switch (action.type) {
        case "CONFIG_INIT": {
            return { ...action.config };
        }
        default: {
            return state;
        }
    }
};
