import 'express-async-errors';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express, type RequestHandler } from 'express';
import { validate } from 'express-validation';

import { AppEnvironment } from '~/libs/enums/enums.js';
import type { ConfigSchema } from '~/libs/packages/config/config.js';
import type { DatabaseService } from '~/libs/packages/database/database.js';
import { jwt } from '~/libs/packages/jwt/jwt.js';
import { userService } from '~/packages/users/users.js';

import { HttpMethod } from '../http/http.js';
import type { LoggerService } from '../logger/logger.js';
import { formatHttpMethod } from './libs/helpers/helpers.js';
import type {
  ServerApiDetails,
  ServerApplication,
} from './libs/interfaces/interfaces.js';
import {
  authMiddleware,
  errorHandlerMiddleware,
} from './libs/middlewares/middlewares.js';
import type { AppRouteParameters } from './libs/types/types.js';

type Constructor = {
  config: ConfigSchema;
  logger: LoggerService;
  apis: ServerApiDetails[];
  db: DatabaseService;
};

class ServerApp implements ServerApplication {
  private config: ConfigSchema;

  private logger: LoggerService;

  private app: Express;

  private apis: ServerApiDetails[];

  private db: DatabaseService;

  public constructor({ config, logger, apis, db }: Constructor) {
    this.config = config;
    this.apis = apis;
    this.logger = logger;
    this.db = db;
    this.app = express();
  }

  public async init(): Promise<void> {
    this.enableProxyTrust();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandler();

    await this.db.init();

    const host = this.config.ENV.APP.HOST;
    const port = this.config.ENV.APP.PORT;

    this.app.listen({ port, host }, () => {
      this.logger.info(`Server is running on ${host}:${port}`);
    });
  }

  public addRoute(parameters: AppRouteParameters): void {
    const { path, method, handler, validation } = parameters;
    const handlers: RequestHandler[] = [handler];

    if (validation) {
      handlers.unshift(validate(validation, {}, {}));
    }

    this.app[formatHttpMethod(method)](path, ...handlers);

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
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(authMiddleware({ logger: this.logger, jwt, userService }));

    this.initCors();
  }

  private initCors(): void {
    if (this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION) {
      return;
    }

    this.app.use(
      cors({
        origin: this.config.ENV.CLIENT[this.config.ENV.APP.ENVIRONMENT],
        methods: [
          HttpMethod.DELETE,
          HttpMethod.GET,
          HttpMethod.POST,
          HttpMethod.PUT,
        ],
      }),
    );
  }

  private initErrorHandler(): void {
    this.app.use(errorHandlerMiddleware(this.logger));
  }

  private enableProxyTrust(): void {
    this.app.set('trust proxy', true);
  }
}

export { ServerApp };
