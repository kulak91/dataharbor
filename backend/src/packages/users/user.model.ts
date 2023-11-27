import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from '~/libs/packages/database/database.js';
import {
  BaseModel,
  DatabaseTableName,
  DataTypes,
  Model,
  sequelize,
} from '~/libs/packages/database/database.js';

import { UserColumnName } from './libs/enums/enums.js';

interface User {
  email: string;
  passwordHash: string;
  passwordSalt: string;
}

class UserModel extends BaseModel<UserModel> {
  public email!: string;
  public passwordHash!: string;
  public passwordSalt!: string;
}

UserModel.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING(60),
    passwordSalt: DataTypes.STRING(60),
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: 'users' },
);

export { UserModel };
