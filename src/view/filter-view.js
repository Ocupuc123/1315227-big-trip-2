import AbstractView from '../framework/view/abstract-view.js';

const createFilterItems = (filters) => filters.map((filter, index)=> `<div class="trip-filters__filter">
      <input id="filter-${filter.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type.toLowerCase()}" ${filter.isActive ? '' : 'disabled'} ${index === 0 ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type.toLowerCase()}">${filter.type}</label>
    </div>`).join('');

const createFilterTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.length ? createFilterItems(filters) : ''}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = [];

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
