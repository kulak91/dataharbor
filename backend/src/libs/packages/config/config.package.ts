import convict, { type Config as TConfig } from 'convict';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type LoggerService } from '~/libs/packages/logger/logger.js';

import { type ConfigSchema } from './libs/interfaces/interfaces.js';
import { type AuthConfig, type EnvironmentSchema } from './libs/types/types.js';

class Config implements ConfigSchema {
  public ENV: EnvironmentSchema;

  public AUTH: AuthConfig;

  private logger: LoggerService;

  public constructor(logger: LoggerService) {
    this.logger = logger;

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });
    this.ENV = this.envSchema.getProperties();
    this.AUTH = this.authConfig;

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
        PUBLIC_URL: {
          doc: 'Deployed Api URL',
          format: String,
          env: 'PUBLIC_URL',
          nullable: true,
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

  private get authConfig(): AuthConfig {
    return {
      ACCESS_TOKEN_EXP: '10m',
      REFRESH_TOKEN_EXP: '4w',
    };
  }
}

export { Config };
