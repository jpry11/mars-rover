import { parseInput } from "./parsers/inputParser";
import Plateau, { PlateauCoordinates } from "./plateau";
import { createRover } from "./factories/roverFactory";
import { Coordinates, Orientation, Position } from "./types";

export default class RoverManager {
  public processCommands(input: string[]): string[] {
    const { plateauCoordinates, roverPositions, roverCommands } =
      parseInput(input);

    const plateau = new Plateau(plateauCoordinates);
    const rovers = this.createRovers(
      roverPositions,
      plateau.getPlateauCoordinates()
    );
    const output: string[] = [];
    rovers.forEach((rover, index) => {
      try {
        rover.processMovements(roverCommands[index]);
        output.push(
          this.roverOutPutToString(rover.getPositionAndOrientation())
        );
      } catch (error) {
        if (error instanceof Error) {
          output.push(error.message);
        }
      }
    });

    return output;
  }

  private createRovers(
    roverPositions: {
      coordinates: Coordinates;
      orientation: Orientation;
    }[],
    plateauCoordinates: PlateauCoordinates
  ) {
    return roverPositions.map((position) =>
      createRover({
        startingCoordinates: position.coordinates,
        startingOrientation: position.orientation,
        plateauCoordinates,
      })
    );
  }

  private roverOutPutToString(roverOutput: Position): string {
    return `${roverOutput.coordinates.join(" ")} ${roverOutput.orientation}`;
  }
}
