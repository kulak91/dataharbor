import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface();
  // Insert your data here:
  /// .bulkInsert();
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface();
  // Remove generated data here:
  // .bulkDelete();
};

export { down, up };
