import TripPresenter from './presenter/trip-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const infoContainer = document.querySelector('.trip-main');

const tripPresenter = new TripPresenter({
  filterContainer,
  eventContainer,
  infoContainer
});

tripPresenter.init();
