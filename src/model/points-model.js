import { mockPoints } from '../mock/point.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';

export default class PointsModel {
  points = mockPoints;
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
