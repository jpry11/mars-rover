// type RoverInput =

import { PlateauCoordinates } from "./plateau";
import { Orientation, Rotate, Coordinates, Position, Command } from "./types";

export default class Rover {
  private readonly moveForwardByOrientationMap = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };

  private readonly rotateByOrientationMap: {
    [key in Orientation]: { [key in Rotate]: Orientation };
  } = {
    N: {
      L: "W",
      R: "E",
    },
    E: {
      L: "N",
      R: "S",
    },
    S: {
      L: "E",
      R: "W",
    },
    W: {
      L: "S",
      R: "N",
    },
  };

  private coordinates: Coordinates;
  private orientation: Orientation;
  private plateauCoordinates: PlateauCoordinates;

  constructor(
    startingCoordinates: Coordinates,
    startingOrientation: Orientation,
    plateauCoordinates: PlateauCoordinates
  ) {
    this.plateauCoordinates = plateauCoordinates;
    this.coordinates = this.tryToLandRover(startingCoordinates);
    this.orientation = startingOrientation;
  }

  public getPositionAndOrientation(): Position {
    return {
      coordinates: this.coordinates,
      orientation: this.orientation,
    };
  }

  public processMovements(movements: Command[]): void {
    movements.forEach((movement) => this.moveRover(movement));
  }

  private moveRover(movement: Command): void {
    if (movement === "M") {
      this.coordinates = this.coordinates.map(
        (value, index) =>
          (value += this.moveForwardByOrientationMap[this.orientation][index])
      ) as Coordinates;
    } else {
      this.orientation =
        this.rotateByOrientationMap[this.orientation][movement];
    }

    if (this.isOffPlateau(this.coordinates)) {
      throw new Error("Rover has fallen off the plateau");
    }
  }

  private isOffPlateau(coordinates: Coordinates): boolean {
    return coordinates.some((coordinate, index) => {
      if (
        coordinate < this.plateauCoordinates.bottomLeftCorner[index] ||
        coordinate > this.plateauCoordinates.topRightCorner[index]
      ) {
        return true;
      }
      return false;
    });
  }

  private tryToLandRover(coordinates: Coordinates): Coordinates {
    if (this.isOffPlateau(coordinates)) {
      throw new Error("Cannot land rover at these coordinates");
    }
    return coordinates;
  }
}
