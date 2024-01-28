import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';
import { DatabaseUtilityFactory } from './database-utility-factory.js';

const db = new Database(config, logger);

const utilityFactory = new DatabaseUtilityFactory(db.client, logger);

const migrator = utilityFactory.createMigrator();
const seeder = utilityFactory.createSeeder();

const sequelize = db.client;

type Migration = typeof migrator._types.migration;

export { db, migrator, seeder, sequelize };
export type { DatabaseService } from './libs/interfaces/interfaces.js';
export type { Migration };
export { BaseModel } from './base.model.js';
export { DatabaseTableName } from './libs/enums/enums.js';
export type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from '@sequelize/core';
export {
  Attribute,
  BelongsTo,
  DataTypes,
  HasMany,
  Model,
} from '@sequelize/core';
