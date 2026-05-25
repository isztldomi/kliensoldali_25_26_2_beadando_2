export const COLORS = ["red", "green", "blue", "yellow", "purple"] as const;

export type Color = (typeof COLORS)[number];
