import { type AppRouteParameters } from '../types/types.js';

interface IServerAppApi {
  version: string;
  routes: AppRouteParameters[];
}

export { type IServerAppApi };
