import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Dialect, Options } from '@sequelize/core';
import { importModels, Sequelize } from '@sequelize/core';

import type { ConfigSchema } from '~/libs/packages/config/config.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';

import type { DatabaseService } from './libs/interfaces/interfaces.js';

class Database implements DatabaseService {
  private config: ConfigSchema;

  private logger: LoggerService;

  private directory: string;

  public client: Sequelize;

  public constructor(config: ConfigSchema, logger: LoggerService) {
    this.config = config;
    this.logger = logger;
    this.directory = this.directory = dirname(fileURLToPath(import.meta.url));

    this.client = new Sequelize(
      this.config.ENV.DB.CONNECTION_STRING,
      this.dbConfig,
    );
  }

  public async init(): Promise<void> {
    const models = await importModels(
      join(this.directory, '../../**/*.model.{ts,js}'),
    );
    this.client.addModels(models);
    this.logger.info('Database models loaded.');

    await this.connect();
  }

  public async connect(): Promise<void> {
    await this.client.authenticate();

    this.logger.info('Database connected successfully.');
  }

  private get dbConfig(): Options {
    return {
      dialect: this.config.ENV.DB.DIALECT as Dialect,
      pool: {
        max: this.config.ENV.DB.POOL_MAX,
        min: this.config.ENV.DB.POOL_MIN,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    };
  }
}

export { Database };
