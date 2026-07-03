import { filter } from '../utils/filter.js';

const createFilter = (points) => Object.entries(filter).map(
  ([FilterType, filterPoints]) => ({
    type: FilterType,
    isActive: Boolean(filterPoints(points))
  })
);

export { createFilter };
