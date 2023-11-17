import cors from 'cors';
import express, { type Express } from 'express';

import type { IConfig } from '~/libs/packages/config/config.js';
import type { IDatabase } from '~/libs/packages/database/database.js';

import { HttpMethod } from '../http/http.js';
import type { ILogger } from '../logger/logger.js';
import { formatHttpMethod } from './libs/helpers/helpers.js';
import type { IServerAppApi } from './libs/interfaces/interfaces.js';
import type { AppRouteParameters } from './libs/types/app-route-parameters.type.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
  apis: IServerAppApi[];
  db: IDatabase;
};

class ServerApp {
  private config: IConfig;
  private logger: ILogger;
  private app: Express;
  private apis: IServerAppApi[];
  private db: IDatabase;

  public constructor({ config, logger, apis, db }: Constructor) {
    this.config = config;
    this.apis = apis;
    this.logger = logger;
    this.db = db;
    this.app = express();
  }

  public async init(): Promise<void> {
    this.initMiddlewares();
    this.initRoutes();
    this.db.connect();

    const host = this.config.ENV.APP.HOST;
    const port = this.config.ENV.APP.PORT;

    this.app.listen({ port, host }, () => {
      this.logger.info(`Server is running on ${host}:${port}`);
    });

  }

  public addRoute(parameters: AppRouteParameters): void {
    const { path, method, handler } = parameters;

    this.app[formatHttpMethod(method)](path, handler);

    this.logger.info(`Route: ${method} ${path} is registered`);
  }

  public addRoutes(parameters: AppRouteParameters[]): void {
    for (const it of parameters) {
      this.addRoute(it);
    }
  }

  public initRoutes(): void {
    const routers = this.apis.flatMap((it) => it.routes);

    this.addRoutes(routers);
  }

  private initMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(express.static())
    this.app.use(cors({ origin: this.config.ENV.CLIENT[this.config.ENV.APP.ENVIRONMENT], methods: [HttpMethod.DELETE, HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT] }));
  }

}

export { ServerApp };
