import type { Migration } from '~/libs/packages/database/database.js';

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.query('implement up migration here');
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.query('implement down migration here');
};

export { down, up };
