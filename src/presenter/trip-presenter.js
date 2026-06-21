import { mockPoints } from '../mock/point.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointFormView from '../view/point-form-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../render.js';

console.log(mockPoints);

export default class TripPresenter {
  filterComponent = new FilterView();
  sortComponent = new SortView();
  pointListComponent = new PointListView();
  pointFormComponent = new PointFormView();
  infoComponent = new InfoView();

  constructor({filterContainer, eventContainer, infoContainer}) {
    this.filterContainer = filterContainer;
    this.eventContainer = eventContainer;
    this.infoContainer = infoContainer;
  }

  init() {
    render(this.infoComponent, this.infoContainer, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.filterContainer);
    render(this.sortComponent, this.eventContainer);
    render(this.pointListComponent, this.eventContainer);
    render(this.pointFormComponent, this.pointListComponent.getElement());

    for (let i = 0; i < mockPoints.length; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
