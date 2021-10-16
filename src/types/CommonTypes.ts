export type ImageType = {
    url: string;
    /** Optional, "left" is not supported in questions */
    alignment?: "left" | "center" | "right";
    /** Decimal between 0 and 1, represents total width of parent */
    size?: number;
    /** Text that will be shown in case the image cannot be loaded, also useful for accessibility */
    alt?: string;
};
