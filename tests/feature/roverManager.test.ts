import RoverManager from "../../src/roverManager";

describe("RoverManager", () => {
  let roverManager: RoverManager;

  beforeEach(() => {
    roverManager = new RoverManager();
  });

  it("should bubble up parser errors", () => {
    const input = ["1"];

    const roverManager = new RoverManager();

    expect(() => {
      roverManager.processCommands(input);
    }).toThrow();
  });

  it("should bubble up error when rover cannot be landed", () => {
    const input = ["5 5", "1 6 N", "L"];

    expect(() => {
      roverManager.processCommands(input);
    }).toThrow("Cannot land rover at these coordinates");
  });

  it.each([
    {
      input: [
        "5 5",
        "1 2 N",
        "L M L M L M L M M",
        "3 3 E",
        "M M R M M R M R R M",
      ],
      expectedOutput: ["1 3 N", "5 1 E"],
    },
    {
      input: [
        "5 5",
        "3 3 S",
        "L M L M L M R M R",
        "3 1 N",
        "M M L M M R R M",
        "2 2 W",
        "L M M L",
      ],
      expectedOutput: ["3 5 E", "2 3 E", "2 0 E"],
    },
  ])("should correctly process commands", ({ input, expectedOutput }) => {
    const output = roverManager.processCommands(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should return error messages in output when a rover falls off the plateau", () => {
    const input = [
      "5 5",
      "1 2 N",
      "L M L M L M L M M",
      "0 0 W",
      "M",
      "5 5 N",
      "M",
    ];
    const expectedOutput = [
      "1 3 N",
      "Rover has fallen off the plateau",
      "Rover has fallen off the plateau",
    ];

    const output = roverManager.processCommands(input);

    expect(output).toEqual(expectedOutput);
  });

  // What about creating a rover off the plateau?
  // What about rovers hitting into each other?
});
