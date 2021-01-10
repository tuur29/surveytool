import { ConfigType } from "../../types/ConfigTypes";
import { generateThemeStorageKey } from "../../utils/utils";
import { resultContentTypes } from "../../types/ResultTypes";
import { ConfigActions } from "../actions/configActions";

// ----------------------------------------------------------------------
// Initial state
// ----------------------------------------------------------------------

export const initialConfigState: ConfigType & { initialized: boolean } = {
    initialized: false,
    id: "",
    labels: {},
    theme: {},
    questions: [],
    result: {
        scoreDomain: [0, 100],
        enableControls: false,
        content: [{ type: resultContentTypes.label, style: "title", label: "Thanks for your submission!" }],
    },
};
export type ConfigState = typeof initialConfigState;

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
                initialized: true,
                theme: {
                    ...initialConfigState.theme,
                    ...action.config.theme,
                    ...locallyStoredTheme,
                },
                result: {
                    ...initialConfigState.result,
                    ...action.config.result,
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
