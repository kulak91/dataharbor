import convict, { type Config as TConfig } from 'convict';

import { AppEnvironment } from '~/libs/enums/enums.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import { type EnvironmentSchema } from './libs/types/types.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

class Config implements IConfig {
  public ENV: EnvironmentSchema;
  private logger: ILogger;

  public constructor(logger: ILogger) {
    this.logger = logger;

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });
    this.ENV = this.envSchema.getProperties();

    this.logger.info('.env file successfully parsed.');
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
        HOST: {
          doc: 'Host for server app',
          format: String,
          env: 'HOST',
          default: null,
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DB_CONNECTION_STRING',
          default: null,
        },
        DIALECT: {
          doc: 'Database dialect',
          format: String,
          env: 'DB_DIALECT',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
      JWT: {
        SECRET_KEY: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'SECRET_KEY',
          default: null,
        },
      },
      CLIENT: {
        development: {
          doc: 'Dataharbor local client host.',
          format: String,
          env: 'CLIENT_DEV',
          default: null,
        },
        production: {
          doc: 'Dataharbor production client host.',
          format: String,
          env: 'CLIENT_PROD',
          default: null,
        },
      },
    });
  }
}

export { Config };
