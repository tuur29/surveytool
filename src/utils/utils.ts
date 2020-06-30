/* eslint-disable @typescript-eslint/ban-types */

// ----------------------------------------------------------------------
// Helper methods
// ----------------------------------------------------------------------

export const isProduction = (): boolean => process.env.NODE_ENV === "production";

export const generateAnswerStorageKey = (configId: string): string => `surveyTool-answers-${configId}`;

export const formatTimestamp = (timestamp: number, localeId: string | null | undefined): string =>
    new Intl.DateTimeFormat(localeId || "default", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(timestamp));

// ----------------------------------------------------------------------
// Type helpers
// ----------------------------------------------------------------------

// Source: https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9#gistcomment-3300848
export type DeepPartial<T> = T extends Function
    ? T
    : T extends object
    ? T extends unknown[]
        ? DeepPartial<T[number]>[]
        : { [P in keyof T]?: DeepPartial<T[P]> }
    : T;
