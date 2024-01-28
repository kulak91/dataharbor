import { DataTypes } from '@sequelize/core';

import {
  type Migration,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(DatabaseTableName.SESSIONS, {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    'ip': {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    'token': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'created_at': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    'updated_at': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    'user_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: DatabaseTableName.USERS,
        key: 'id',
      },
      onUpdate: RelationRule.CASCADE,
      onDelete: RelationRule.CASCADE,
    },
  });
};

const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(DatabaseTableName.SESSIONS);
};

export { down, up };
