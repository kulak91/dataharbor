import type { Request, Response } from 'express';

import type { AppRouteParameters } from '~/libs/packages/server-application/server-application.js';

import type { LoggerService } from '../logger/logger.js';
import type { IController } from './libs/interfaces/interfaces.js';
import type {
  ApiHandler,
  ApiHandlerOptions,
  ControllerRouteParameters,
} from './libs/types/types.js';

class Controller implements IController {
  private apiUrl: string;

  public logger: LoggerService;

  public routes: AppRouteParameters[];

  public constructor(logger: LoggerService, apiPath: string) {
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
    const { status, payload, cookie } = await handler(handlerOptions);

    if (cookie) {
      res.cookie(cookie.name, cookie.value, cookie.options);
    }

    res.status(status).send(payload);
  }

  private mapRequest(req: Request): ApiHandlerOptions {
    const { body, query, params, headers, user, ip } = req;
    return {
      body,
      query,
      params,
      headers,
      user,
      client_ip: ip,
    };
  }
}

export { Controller };
