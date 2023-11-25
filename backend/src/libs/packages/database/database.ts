import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';
import { Migrator } from './migrator.js';

const db = new Database(config, logger);

const migrator = new Migrator(db.client);

type Migration = typeof migrator.client._types.migration;

export { db, migrator };
export type { IDatabase } from './libs/interfaces/interfaces.js';
export type { Migration };
