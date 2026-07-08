import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

const BLANK_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #pointListContainer = null;

  #point = null;
  #destinations = [];
  #offers = [];
  #cities = [];

  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(point, destinations, offers, cities) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#cities = cities;

    const { selectedOffers, destination, allOffers } = this.#preparePointData(point);

    this.#pointEditComponent = new PointEditView({
      point,
      selectedOffers,
      destination,
      allOffers,
      isNewPoint: false,
      cities: this.#cities,
      onFormSubmit: () => {
        this.#closeEditForm();
      },
      onCloseClick: () => {
        this.#closeEditForm();
      }
    });

    this.#pointComponent = new PointView({
      point,
      selectedOffers,
      destination,
      onEditClick: () => {
        this.#openEditForm();
      }
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #preparePointData(point = BLANK_POINT) {
    const offerGroup = this.#offers.find((group) => group.type === point.type.toLowerCase());
    const selectedOffers = offerGroup?.offers?.filter((offer) =>
      point.offers.includes(offer.id)
    ) ?? [];
    const allOffers = offerGroup?.offers ?? [];
    const destination = this.#destinations.find(
      (dest) => dest.id === point.destination) ??
      { name: '', description: '', pictures: [] };

    return {
      selectedOffers,
      destination,
      allOffers
    };
  }

  #closeEditForm() {
    if (!this.#pointEditComponent) {
      return;
    }

    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #openEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeEditForm();
    }
  };
}
