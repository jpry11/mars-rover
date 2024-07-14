import { PlateauCoordinates } from "../plateau";
import Rover from "../rover";
import { Coordinates, Orientation } from "../types";

interface RoverConfig {
  startingCoordinates: Coordinates;
  startingOrientation: Orientation;
  plateauCoordinates: PlateauCoordinates;
}

export const createRover = (config: RoverConfig): Rover => {
  return new Rover(
    config.startingCoordinates,
    config.startingOrientation,
    config.plateauCoordinates
  );
};
