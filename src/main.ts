import RoverManager from "./roverManager";

const input = [
  "5 5",
  "1 2 N",
  "L M L M L M L M M",
  "3 3 E",
  "M M R M M R M R R M",
];

const roverManager = new RoverManager();

console.log(roverManager.processCommands(input));
