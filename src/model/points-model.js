import { mockPoints } from '../mock/point.js';
import { DESTINATION_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({ length: DESTINATION_COUNT }, mockPoints);

  getPoints() {
    return this.points;
  }
}
