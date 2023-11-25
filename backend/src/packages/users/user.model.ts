import { BaseModel } from '~/libs/packages/database/base.model.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { UserColumnName } from './libs/enums/enums.js';

class UserModel extends BaseModel {
  public model;
  public constructor() {
    super();
    this.model = this.defineModel(DatabaseTableName.USERS, {
      [UserColumnName.ID]: {
        type: this.dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      [UserColumnName.EMAIL]: {
        type: this.dataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      [UserColumnName.PASSWORD_HASH]: {
        type: this.dataTypes.STRING(60),
        allowNull: false,
      },
      [UserColumnName.PASSWORD_SALT]: {
        type: this.dataTypes.STRING(60),
        allowNull: false,
      },
    });
  }
}

export { UserModel };
