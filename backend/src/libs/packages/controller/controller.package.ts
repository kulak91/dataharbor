import type { Request, Response } from 'express';

import type { AppRouteParameters } from '~/libs/packages/server-application/libs/types/app-route-parameters.type.js';

import type { ILogger } from '../logger/logger.js';
import type { IController } from './libs/interfaces/interfaces.js';
import type {
  ApiHandler,
  ApiHandlerOptions,
  ControllerRouteParameters,
} from './libs/types/types.js';

class Controller implements IController {
  private apiUrl: string;

  public logger: ILogger;

  public routes: AppRouteParameters[];

  public constructor(logger: ILogger, apiPath: string) {
    this.apiUrl = apiPath;
    this.logger = logger;
    this.routes = [];
  }

  public addRoute(options: ControllerRouteParameters): void {
    const { handler, path } = options;
    const fullPath = this.apiUrl + path;

    this.routes.push({
      ...options,
      path: fullPath,
      handler: (req, res) => this.mapHandler(handler, req, res),
    });
  }

  private async mapHandler(
    handler: ApiHandler,
    req: Request,
    res: Response,
  ): Promise<void> {
    this.logger.info(`${req.method} on ${req.url}`);

    const handlerOptions = this.mapRequest(req);
    const { status, payload } = await handler(handlerOptions);

    res.status(status).send(payload);
    return;
  }

  private mapRequest(req: Request): ApiHandlerOptions {
    const { body, query, params, headers } = req;
    return {
      body,
      query,
      params,
      headers,
    };
  }
}

export { Controller };
