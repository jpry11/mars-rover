import { parseInput } from "../../../src/parsers/inputParser";

describe("parseInput", () => {
  it.each([[["1"]], [["1", "1"]], [["1", "1", "1", "1"]]])(
    "should throw an error if input array is incorrect length",
    (input) => {
      expect(() => {
        parseInput(input);
      }).toThrow("Invalid input format");
    }
  );

  it.each([[["1", "1 1 E", "L"]], [["1 2 3", "1 1 E", "L"]]])(
    "should throw an error when plateau coordinates are in an invalid format",
    (input) => {
      expect(() => {
        parseInput(input);
      }).toThrow("Invalid coordinates format");
    }
  );

  it.each([
    [["E 1", "1 1 E", "L"]],
    [["1 E", "1 1 E", "L"]],
    [["-1 2", "1 1 E", "L"]],
    [["1 -2", "1 1 E", "L"]],
  ])("should throw an error when plateau coordinates are invalid", (input) => {
    expect(() => {
      parseInput(input);
    }).toThrow("Invalid coordinates values");
  });

  it.each([
    [["1 1", "1 1 1", "L"]],
    [["1 1", "1 1 R", "L"]],
    [["1 1", "1 1 e", "L"]],
  ])(
    "should throw an error when position string orientation is invalid",
    (input) => {
      expect(() => {
        parseInput(input);
      }).toThrow("Invalid orientation value");
    }
  );

  it.each([
    { input: ["1 1", "1 1 E", "L M R F"], invalidCommand: "F" },
    { input: ["1 1", "1 1 E", "L M R r"], invalidCommand: "r" },
  ])(
    "should throw an error when given invalid commands",
    ({ input, invalidCommand }) => {
      expect(() => {
        parseInput(input);
      }).toThrow(`Invalid rover command ${invalidCommand}`);
    }
  );

  it.each([
    {
      input: ["1 1", "1 2 E", "L M R"],
      expectedOutput: {
        plateauCoordinates: [1, 1],
        roverPositions: [{ coordinates: [1, 2], orientation: "E" }],
        roverCommands: [["L", "M", "R"]],
      },
    },
    {
      input: ["1 1", "1 2 E", "L M R", "2 3 N", "R M L"],
      expectedOutput: {
        plateauCoordinates: [1, 1],
        roverPositions: [
          { coordinates: [1, 2], orientation: "E" },
          { coordinates: [2, 3], orientation: "N" },
        ],
        roverCommands: [
          ["L", "M", "R"],
          ["R", "M", "L"],
        ],
      },
    },
    {
      input: ["1 1", "1 2 E", "L M R", "2 3 N", "R M L", "4 5 S", "L M M"],
      expectedOutput: {
        plateauCoordinates: [1, 1],
        roverPositions: [
          { coordinates: [1, 2], orientation: "E" },
          { coordinates: [2, 3], orientation: "N" },
          { coordinates: [4, 5], orientation: "S" },
        ],
        roverCommands: [
          ["L", "M", "R"],
          ["R", "M", "L"],
          ["L", "M", "M"],
        ],
      },
    },
  ])(
    "should correctly parse when input is valid",
    ({ input, expectedOutput }) => {
      const output = parseInput(input);

      expect(output).toEqual(expectedOutput);
    }
  );
});
