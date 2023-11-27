import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';
import { DatabaseUtilityFactory } from './database-utility-factory.js';

const db = new Database(config, logger);

const utilityFactory = new DatabaseUtilityFactory(db.client, logger);

const migrator = utilityFactory.createMigrator();
const seeder = utilityFactory.createSeeder();

type Migration = typeof migrator._types.migration;

export { db, migrator, seeder };
export type { DatabaseService } from './libs/interfaces/interfaces.js';
export type { Migration };
export { DatabaseTableName } from './libs/enums/enums.js';
