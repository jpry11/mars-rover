import { Coordinates } from "./types";

export interface PlateauCoordinates {
  bottomLeftCorner: Coordinates;
  topRightCorner: Coordinates;
}

export default class Plateau {
  private readonly bottomLeftCorner: Coordinates = [0, 0];
  private topRightCorner: Coordinates;

  constructor(topRightCorner: Coordinates) {
    this.topRightCorner = topRightCorner;
  }

  public getPlateauCoordinates(): PlateauCoordinates {
    return {
      bottomLeftCorner: this.bottomLeftCorner,
      topRightCorner: this.topRightCorner,
    };
  }
}
