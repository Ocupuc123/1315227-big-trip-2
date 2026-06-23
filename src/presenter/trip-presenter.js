import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  filterComponent = new FilterView();
  sortComponent = new SortView();
  pointListComponent = new PointListView();
  pointEditComponent = new PointEditView();
  infoComponent = new InfoView();

  constructor({filterContainer, eventContainer, infoContainer, pointsModel}) {
    this.filterContainer = filterContainer;
    this.eventContainer = eventContainer;
    this.infoContainer = infoContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(this.infoComponent, this.infoContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.eventContainer);
    render(this.pointListComponent, this.eventContainer);
    render(this.pointEditComponent, this.pointListComponent.getElement());

    for (const point of this.points) {
      const offerGroup = this.offers.find((group) => group.type === point.type);
      const offers = offerGroup?.offers?.filter((offer) => point.offers.includes(offer.id) ?? []);
      const destinations = this.destinations.find((destination) => destination.id === point.destination);

      render(new PointView({point, offers, destinations}), this.pointListComponent.getElement());
    }
  }
}
