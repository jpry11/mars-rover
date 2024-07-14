import {
  Coordinates,
  Command,
  Orientation,
  commands,
  orientations,
} from "../types";

const verifyCommands = (commandsInput: string[]): Command[] => {
  commandsInput.forEach((command) => {
    if (!(commands as ReadonlyArray<string>).includes(command))
      throw new Error(`Invalid rover command ${command}`);
  });

  return commandsInput as Command[];
};

const parseCoordinates = (coordinatesInput: string[]): [number, number] => {
  if (coordinatesInput.length !== 2) {
    throw new Error("Invalid coordinates format");
  }

  const x = parseInt(coordinatesInput[0], 10);
  const y = parseInt(coordinatesInput[1], 10);
  if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
    throw new Error("Invalid coordinates values");
  }

  return [x, y];
};

const parsePositionString = (
  positionInput: string[]
): { coordinates: Coordinates; orientation: Orientation } => {
  if (positionInput.length !== 3) {
    throw new Error("Invalid position string format");
  }

  const coordinates = parseCoordinates([positionInput[0], positionInput[1]]);
  const orientation = positionInput[2];

  if (!(orientations as ReadonlyArray<string>).includes(orientation)) {
    throw new Error("Invalid orientation value");
  }

  return { coordinates, orientation: orientation as Orientation };
};

export const parseInput = (input: string[]) => {
  if (input.length % 2 === 0 || input.length < 3) {
    throw new Error("Invalid input format");
  }
  const plateauCoordinates = parseCoordinates(input[0].split(" "));
  const roverPositions = [];
  const roverCommands = [];

  for (let i = 1; i < input.length; i += 2) {
    roverPositions.push(parsePositionString(input[i].split(" ")));
    roverCommands.push(verifyCommands(input[i + 1].split(" ")));
  }

  return {
    plateauCoordinates,
    roverPositions,
    roverCommands,
  };
};
