import { PlateauCoordinates } from "../../src/plateau";
import Rover from "../../src/rover";
import { Coordinates, Orientation, Movement } from "../../src/types";

describe("Rover", () => {
  const plateauCoordinates: PlateauCoordinates = {
    bottomLeftCorner: [0, 0],
    topRightCorner: [5, 5],
  };

  it("should throw an error when trying to land the rover off the plateau", () => {
    const startingCoordinates: Coordinates = [5, 6];
    const startingOrientation: Orientation = "N";
    expect(() => {
      const rover = new Rover(
        startingCoordinates,
        startingOrientation,
        plateauCoordinates
      );
    }).toThrow("Cannot land rover at these coordinates");
  });

  it("should return current position and orientation when getPositionAndOrientation is called", () => {
    const startingCoordinates: Coordinates = [1, 2];
    const startingOrientation: Orientation = "N";
    const rover = new Rover(
      startingCoordinates,
      startingOrientation,
      plateauCoordinates
    );

    const positionAndOrientation = rover.getPositionAndOrientation();

    expect(positionAndOrientation).toEqual({
      coordinates: startingCoordinates,
      orientation: startingOrientation,
    });
  });

  it.each([
    {
      startPosition: {
        coordinates: [1, 2],
        orientation: "N",
      },
      movements: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      expectedEndPosition: {
        coordinates: [1, 3],
        orientation: "N",
      },
    },
    {
      startPosition: {
        coordinates: [3, 3],
        orientation: "E",
      },
      movements: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
      expectedEndPosition: {
        coordinates: [5, 1],
        orientation: "E",
      },
    },
  ])(
    "should processMovements correctly",
    ({ startPosition, movements, expectedEndPosition }) => {
      const rover = new Rover(
        startPosition.coordinates as Coordinates,
        startPosition.orientation as Orientation,
        plateauCoordinates
      );

      rover.processMovements(movements as unknown as Movement[]);
      const endPositionAndOrientation = rover.getPositionAndOrientation();

      expect(endPositionAndOrientation).toEqual(expectedEndPosition);
    }
  );

  it.each([
    {
      startPosition: {
        coordinates: [3, 3],
        orientation: "N",
      },
      movements: ["M", "M", "M"],
    },
    {
      startPosition: {
        coordinates: [3, 3],
        orientation: "E",
      },
      movements: ["M", "M", "M"],
    },
    {
      startPosition: {
        coordinates: [3, 3],
        orientation: "S",
      },
      movements: ["M", "M", "M", "M"],
    },
    {
      startPosition: {
        coordinates: [3, 3],
        orientation: "W",
      },
      movements: ["M", "M", "M", "M"],
    },
  ])(
    "should throw an error when the rover falls off the plateau",
    ({ startPosition, movements }) => {
      const rover = new Rover(
        startPosition.coordinates as Coordinates,
        startPosition.orientation as Orientation,
        plateauCoordinates
      );

      expect(() => {
        rover.processMovements(movements as unknown as Movement[]);
      }).toThrow("Rover has fallen off the plateau");
    }
  );
});
