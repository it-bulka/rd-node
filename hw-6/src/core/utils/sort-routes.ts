import { RouteMeta } from '@core/types';

/**
 * Express
 * static route (e.g. /favorites) should be handled before route with dynamic params (e.g. /:filmId)
 * */
export const sortRoutes = (a: RouteMeta, b: RouteMeta) => {
  const aHasParam = a.path.includes(':') ? 1 : 0;
  const bHasParam = b.path.includes(':') ? 1 : 0;
  return aHasParam - bHasParam;
}