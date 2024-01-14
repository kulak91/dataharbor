import { type Migration } from '~/libs/packages/database/database.js';

const TABLE_NAME = 'user_details';
const DefaultUserInfo = {
  firstName: 'Linda',
  lastName: 'Thompson',
} as const;

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(
    TABLE_NAME,
    [
      {
        user_id: 1,
        first_name: DefaultUserInfo.firstName,
        last_name: DefaultUserInfo.lastName,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  );
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.queryInterface.bulkDelete(TABLE_NAME, {});
};

export { down, up };
