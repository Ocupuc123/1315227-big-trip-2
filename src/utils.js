import { DateRange, DurationRange } from './const.js';

const getRandomDateInRange = (minDate, maxDate) => {
  const min = new Date(minDate).getTime();
  const max = new Date(maxDate).getTime();
  return new Date(min + Math.random() * (max - min));
};

const getRandomPointDates = () => {
  const dateFrom = getRandomDateInRange(DateRange.MIN, DateRange.MAX);
  const durationMs = (DurationRange.MIN_HOURS + Math.random() * (DurationRange.MAX_HOURS - DurationRange.MIN_HOURS)) * 60 * 60 * 1000;
  const dateTo = new Date(dateFrom.getTime() + durationMs);

  return {
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString()
  };
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const generateId = () => crypto.randomUUID();

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { getRandomArrayElement, generateId, getRandomInt, getRandomPointDates };
