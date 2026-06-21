import { OFFER_TITLES, OFFER_PRICES, TYPES, OfferRandomRange, GroupOfferRandomRange } from '../const.js';
import { getRandomArrayElement, generateId, getRandomInt } from '../utils.js';

const createOffer = () => ({
  id: generateId(),
  title: getRandomArrayElement(OFFER_TITLES),
  price: getRandomArrayElement(OFFER_PRICES),
});

const createGroup = () => ({
  type: getRandomArrayElement(TYPES),
  offers: Array.from({ length: getRandomInt(OfferRandomRange.MIN, OfferRandomRange.MAX) }, createOffer)
});

const mockOffers = Array.from({ length: getRandomInt(GroupOfferRandomRange.MIN, GroupOfferRandomRange.MAX) }, createGroup);

export { mockOffers };
