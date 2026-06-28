import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const infoContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({
  filterContainer,
  eventContainer,
  infoContainer,
  pointsModel
});

tripPresenter.init();
