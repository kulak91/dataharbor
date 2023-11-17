import type { IConfig } from '../config/config.js';
import type { IServerAppApi } from './libs/interfaces/interfaces.js';
import type { AppRouteParameters } from './libs/types/app-route-parameters.type.js';

class ServerAppApi implements IServerAppApi {
  public version: string;

  public routes: AppRouteParameters[];

  private config: IConfig;

  public constructor(version: string, config: IConfig, ...handlers: AppRouteParameters[]) {
    this.version = version;
    this.config = config;
    this.routes = handlers.map((it) => ({
      ...it,
      path: `/api/${this.version}${it.path}`,
    }));
  }
}

export { ServerAppApi };
