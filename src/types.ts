export const orientations = ["N", "E", "S", "W"] as const;
export const commands = ["L", "R", "M"] as const;

export type Orientation = (typeof orientations)[number];
export type Command = (typeof commands)[number];
export type Coordinates = [number, number];
export type Rotate = "R" | "L";

export type Position = {
  coordinates: Coordinates;
  orientation: Orientation;
};
