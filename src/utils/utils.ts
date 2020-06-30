/* eslint-disable @typescript-eslint/ban-types */

// ----------------------------------------------------------------------
// Helper methods
// ----------------------------------------------------------------------

export const isProduction = (): boolean => process.env.NODE_ENV === "production";

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
