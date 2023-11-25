import { DataTypes } from 'sequelize';

import type { Migration } from '~/libs/packages/database/database.js';

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface();
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface();
};

export { down, up };
