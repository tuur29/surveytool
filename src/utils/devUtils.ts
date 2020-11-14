export const isDev = (allowOnDemo?: boolean): boolean =>
    process.env.NODE_ENV !== "production" || (!!allowOnDemo && !!process.env.REACT_APP_DEMO);
