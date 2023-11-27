import type { Dialect, Options } from 'sequelize';
import { Sequelize } from 'sequelize';

import type { ConfigSchema } from '~/libs/packages/config/config.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';

class Database {
  private config: ConfigSchema;

  private logger: LoggerService;

  public client: Sequelize;

  public constructor(config: ConfigSchema, logger: LoggerService) {
    this.config = config;
    this.logger = logger;

    this.client = new Sequelize(
      this.config.ENV.DB.CONNECTION_STRING,
      this.dbConfig,
    );
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
