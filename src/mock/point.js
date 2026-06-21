import { TYPES, PRICES, DESTINATION_COUNT } from '../const.js';
import { getRandomArrayElement, generateId, getRandomPointDates } from '../utils.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';

const createPoint = (destinations, offers) => {
  const type = getRandomArrayElement(TYPES);
  const offerGroup = offers.find((group) => group.type === type);
  const { dateFrom, dateTo } = getRandomPointDates();

  return {
    id: generateId(),
    basePrice: getRandomArrayElement(PRICES),
    dateFrom,
    dateTo,
    destination: destinations.length ? getRandomArrayElement(destinations).id : '',
    isFavorite: Boolean(Math.round(Math.random())),
    offers: offerGroup?.offers?.length ? [getRandomArrayElement(offerGroup.offers).id] : [],
    type
  };
};

const mockPoints = Array.from({length: DESTINATION_COUNT}, ()=> createPoint(mockDestinations, mockOffers));

export { mockPoints };
