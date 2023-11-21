import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';

const db = new Database(config, logger);

export { db };
export type { IDatabase } from './libs/interfaces/interfaces.js';
