import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UserColumnName } from '~/packages/users/users.js';

const defaultPassword = '12345Qwerty';
const defaultPasswordSalt = 'salt-me';

const data = [
  {
    [UserColumnName.EMAIL]: 'admin@admin.com',
  },
];

const up: Migration = async ({ context: sequelize }) => {
  const formData = [];

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];

    formData.push({
      ...item,
      [UserColumnName.PASSWORD_HASH]: defaultPassword,
      [UserColumnName.PASSWORD_SALT]: defaultPasswordSalt,
      [UserColumnName.CREATED_AT]: new Date(),
      [UserColumnName.UPDATED_AT]: new Date(),
    });
  }

  await sequelize
    .getQueryInterface()
    .bulkInsert(DatabaseTableName.USERS, formData);
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete(DatabaseTableName.USERS, {});
};

export { down, up };
