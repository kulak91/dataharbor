import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UserColumnName } from '~/packages/users/users.js';

const DefaultUser = {
  email: 'admin@admin.com',
  password: '12345Qwerty',
  salt: 'random-salt',
  id: 1,
} as const;

const data = [
  {
    [UserColumnName.EMAIL]: DefaultUser.email,
    [UserColumnName.ID]: DefaultUser.id,
    [UserColumnName.PASSWORD_HASH]: DefaultUser.password,
    [UserColumnName.PASSWORD_SALT]: DefaultUser.salt,
  },
];

const up: Migration = async ({ context: sequelize }) => {
  const migrations = [];

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];

    migrations.push({
      ...item,
      [UserColumnName.CREATED_AT]: new Date(),
      [UserColumnName.UPDATED_AT]: new Date(),
    });
  }

  await sequelize
    .getQueryInterface()
    .bulkInsert(DatabaseTableName.USERS, migrations);
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete(DatabaseTableName.USERS, {});
};

export { down, up };
