import { type AppRouteParameters } from '~/libs/packages/server-application/libs/types/app-route-parameters.type.js';

import type { ControllerRouteParameters } from '../types/types.js';

interface IController {
  routes: AppRouteParameters[];
  addRoute(options: ControllerRouteParameters): void;
}

export { type IController };
