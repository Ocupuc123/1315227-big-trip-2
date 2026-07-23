export default class DestinationsModel {
  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get cities() {
    return Array.from(new Set(this.#destinations.map((city) => city.name)));
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;

      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
