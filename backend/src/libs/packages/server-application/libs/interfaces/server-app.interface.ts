import { type AppRouteParameters } from '../types/app-route-parameters.type.js';

interface ServerApplication {
  addRoute(parameters: AppRouteParameters): void;
  addRoutes(parameters: AppRouteParameters[]): void;
}

export { type ServerApplication };
