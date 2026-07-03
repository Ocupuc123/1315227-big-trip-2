import { FilterType } from '../const.js';
import { isPointFuture, isPointPast, isPointPresent } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.length,
  [FilterType.FUTURE]: (points) => points.filter((point)=> isPointFuture(point.dateFrom)).length,
  [FilterType.PAST]: (points) => points.filter((point)=> isPointPast(point.dateTo)).length,
  [FilterType.PRESENT]: (points) => points.filter((point)=> isPointPresent(point.dateFrom, point.dateTo)).length,
};

export { filter };
