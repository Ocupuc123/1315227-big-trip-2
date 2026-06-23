import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateRange, DurationRange } from './const.js';

dayjs.extend(duration);

const getRandomDateInRange = (minDate, maxDate) => {
  const min = new Date(minDate).getTime();
  const max = new Date(maxDate).getTime();
  return new Date(min + Math.random() * (max - min));
};

const formatPointDate = (date, format) => date ? dayjs(date).format(format) : '';

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

const getDurationInPoint = (dateFrom, dateTo) => {
  const timeDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const totalMinutes = timeDuration.asMinutes();

  const pad = (num) => String(num).padStart(2, '0');

  if (totalMinutes < 60) {
    return `${pad(minutes)}M`;
  }

  if (days === 0) {
    return `${pad(hours)}H ${pad(minutes)}M`;
  }

  return `${pad(days)}D ${pad(hours)}H ${pad(minutes)}M`;
};

export { getRandomArrayElement, generateId, getRandomInt, getRandomPointDates, formatPointDate, getDurationInPoint };
