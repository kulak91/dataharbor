import { DataTypes } from '@sequelize/core';

import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

const USER_DETAILS_TABLE_NAME = DatabaseTableName.USER_DETAILS;
const USERS_TABLE_NAME = DatabaseTableName.USERS;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(USER_DETAILS_TABLE_NAME, {
    [ColumnName.ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    [ColumnName.USER_ID]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: USERS_TABLE_NAME,
        key: 'id',
      },
      onUpdate: RelationRule.CASCADE,
      onDelete: RelationRule.CASCADE,
    },
    [ColumnName.FIRST_NAME]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [ColumnName.LAST_NAME]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [ColumnName.CREATED_AT]: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    [ColumnName.UPDATED_AT]: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(USER_DETAILS_TABLE_NAME);
};

export { down, up };
