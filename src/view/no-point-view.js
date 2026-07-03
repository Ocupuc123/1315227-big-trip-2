import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, NoPointMessage } from '../const.js';

const createNoPointTemplate = (filterType) => {
  const message = NoPointMessage[filterType] || NoPointMessage[FilterType.EVERYTHING];
  return `<p class="trip-events__msg">${message}</p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}

