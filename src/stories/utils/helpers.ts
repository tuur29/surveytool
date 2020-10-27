export const getEnumValues = <T extends string | number>(input: Record<string, T>): T[] =>
    Object.values(input).filter((val) => typeof val === "string");
