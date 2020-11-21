/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ // We actually want to use Typescript inferring
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
