import { type AppRouteParameters } from '../types/app-route-parameters.type.js';

interface IServerApp {
  addRoute(parameters: AppRouteParameters): void;
  addRoutes(parameters: AppRouteParameters[]): void;
}

export { type IServerApp };
