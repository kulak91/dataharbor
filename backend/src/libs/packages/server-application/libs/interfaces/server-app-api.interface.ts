import { type AppRouteParameters } from '../types/types.js';

interface ServerApiDetails {
  version: string;
  routes: AppRouteParameters[];
}

export { type ServerApiDetails };
