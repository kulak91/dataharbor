import type { Sequelize } from '@sequelize/core';
import { Umzug } from 'umzug';

import type { LoggerService } from '~/libs/packages/logger/logger.js';

import { DatabaseUtilityBase } from './database-utility-base.js';
import type { DatabaseConfiguratorFactory } from './libs/interfaces/interfaces.js';

class DatabaseUtilityFactory
  extends DatabaseUtilityBase
  implements DatabaseConfiguratorFactory
{
  public constructor(sequelize: Sequelize, logger: LoggerService) {
    super(sequelize, logger);
  }

  public createMigrator(): Umzug<Sequelize> {
    return new Umzug(
      this.getConfig({
        migrationsFolder: 'migrations',
        outputPath: 'src/db/migrations',
        templateFileName: 'migration.template.ts',
      }),
    );
  }
  public createSeeder(): Umzug<Sequelize> {
    return new Umzug(
      this.getConfig({
        migrationsFolder: 'seeds',
        outputPath: 'src/db/seeds',
        templateFileName: 'seeding.template.ts',
      }),
    );
  }
}

export { DatabaseUtilityFactory };
