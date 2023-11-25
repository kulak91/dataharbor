import type { Sequelize } from 'sequelize';
import { Umzug } from 'umzug';

import type { ILogger } from '~/libs/packages/logger/logger.js';

import { DatabaseUtilityBase } from './database-utility-base.js';
import type { IDatabaseUtilityFactory } from './libs/interfaces/interfaces.js';

class DatabaseUtilityFactory
  extends DatabaseUtilityBase
  implements IDatabaseUtilityFactory
{
  public constructor(sequelize: Sequelize, logger: ILogger) {
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
