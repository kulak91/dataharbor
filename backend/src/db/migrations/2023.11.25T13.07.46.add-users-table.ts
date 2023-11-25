import { DataTypes } from 'sequelize';

import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UserColumnName } from '~/packages/users/users.js';

const TABLE_NAME = DatabaseTableName.USERS;

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    [UserColumnName.ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    [UserColumnName.EMAIL]: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    [UserColumnName.PASSWORD_HASH]: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    [UserColumnName.PASSWORD_SALT]: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    [UserColumnName.CREATED_AT]: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    [UserColumnName.UPDATED_AT]: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

export { down, up };
