import { mockPoints } from '../mock/point.js';

export default class PointsModel {
  points = mockPoints;

  getPoints() {
    return this.points;
  }
}
