/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
import { ConfigType } from "../../types/ConfigTypes";

export const initConfig = (config: ConfigType) => ({
    type: "CONFIG_INIT" as const,
    config,
});

export const toggleBaseTheme = (enabled: boolean) => ({
    type: "CONFIG_TOGGLE_THEME" as const,
    enabled,
});

export type ConfigActions = ReturnType<typeof initConfig> | ReturnType<typeof toggleBaseTheme>;
