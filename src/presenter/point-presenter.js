import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';

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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #pointListContainer = null;

  #point = null;
  #destinations = [];
  #offers = [];
  #cities = [];
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ pointListContainer, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destinations = this.#destinations, offers = this.#offers, cities = this.#cities) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#cities = cities;

    this.#renderPoint();
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #renderPoint() {
    const { selectedOffers, destination, allOffers } = this.#preparePointData(this.#point);

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      selectedOffers,
      destination,
      allOffers,
      isNewPoint: false,
      cities: this.#cities,
      onFormSubmit: () => {
        this.#handleFormSubmit();
      },
      onCloseClick: () => {
        this.#handleCloseClick();
      }
    });

    this.#pointComponent = new PointView({
      point: this.#point,
      selectedOffers,
      destination,
      onEditClick: () => {
        this.#handleEditClick();
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
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

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleCloseClick() {
    this.#replaceFormToPoint();
  }

  #handleFormSubmit() {
    this.#replaceFormToPoint();
  }

  #handleEditClick() {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };
}
