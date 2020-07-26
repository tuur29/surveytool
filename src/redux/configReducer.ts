/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { ConfigType } from "../types/ConfigTypes";
import { generateThemeStorageKey } from "../utils/utils";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialConfigState: ConfigType = {
    id: "",
    questions: [],
    theme: {},
    labels: {},
};
export type ConfigState = typeof initialConfigState;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export const initConfig = (config: ConfigState) => ({
    type: "CONFIG_INIT" as const,
    config,
});

export const toggleBaseTheme = (enabled: boolean) => ({
    type: "CONFIG_TOGGLE_THEME" as const,
    enabled,
});

export type ConfigActions = ReturnType<typeof initConfig> | ReturnType<typeof toggleBaseTheme>;

// ----------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------

export const configReducer = (state: ConfigState = initialConfigState, action: ConfigActions): ConfigState => {
    switch (action.type) {
        case "CONFIG_INIT": {
            // remember dark mode toggle for easier debugging
            const locallyStoredTheme = JSON.parse(
                localStorage.getItem(generateThemeStorageKey(action.config.id)) || "{}",
            );
            return {
                ...initialConfigState,
                ...action.config,
                theme: {
                    ...initialConfigState.theme,
                    ...action.config.theme,
                    ...locallyStoredTheme,
                },
            };
        }
        case "CONFIG_TOGGLE_THEME": {
            // remember dark mode toggle for easier debugging
            localStorage.setItem(generateThemeStorageKey(state.id || ""), JSON.stringify({ darkMode: action.enabled }));
            return { ...state, theme: { ...state.theme, darkMode: action.enabled } };
        }
        default: {
            return state;
        }
    }
};
