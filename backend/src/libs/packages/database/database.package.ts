import type { Dialect,Options  } from 'sequelize';
import { Sequelize } from 'sequelize';

import type { IConfig } from '~/libs/packages/config/config.js';
import type { ILogger } from '~/libs/packages/logger/logger.js';

class Database {
  private config: IConfig;

  private logger: ILogger;

  private client: Sequelize;

  public constructor(config: IConfig, logger: ILogger) {
    this.config = config;
    this.logger = logger;

    this.client = new Sequelize(this.config.ENV.DB.CONNECTION_STRING, this.dbConfig);
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
      }
    };
  }

}

export { Database };
