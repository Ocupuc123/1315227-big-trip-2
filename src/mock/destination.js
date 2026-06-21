import { getRandomArrayElement, generateId, getRandomInt } from '../utils.js';
import { DESCRIPTIONS, CITIES, PictureRandomRange, DestinationRandomRange } from '../const.js';

const createPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${Math.random()}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

const createDestination = ()=> ({
  id: generateId(),
  description: getRandomArrayElement(DESCRIPTIONS),
  name: getRandomArrayElement(CITIES),
  pictures: Array.from({ length: getRandomInt(PictureRandomRange.MIN, PictureRandomRange.MAX) }, createPicture)
});

const mockDestinations = Array.from({ length: getRandomInt(DestinationRandomRange.MIN, DestinationRandomRange.MAX) }, createDestination);

export { mockDestinations };
