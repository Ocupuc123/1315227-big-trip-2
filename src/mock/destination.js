import { getRandomArrayElement, generateId, getRandomInt } from '../utils.js';
import { TYPES, DESCRIPTIONS, CITIES, PictureRandomRange } from '../const.js';

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

const mockDestinations = TYPES.map(createDestination);

export { mockDestinations };
