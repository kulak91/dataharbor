import type { IServerAppApi } from './libs/interfaces/interfaces.js';
import type { AppRouteParameters } from './libs/types/app-route-parameters.type.js';

class ServerAppApi implements IServerAppApi {
  public version: string;

  public routes: AppRouteParameters[];

  public constructor(version: string, ...handlers: AppRouteParameters[]) {
    this.version = version;
    this.routes = handlers.map((it) => ({
      ...it,
      path: `/api/${this.version}${it.path}`,
    }));
  }
}

export { ServerAppApi };
