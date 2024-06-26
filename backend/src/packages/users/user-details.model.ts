import {
  BaseModel,
  DataTypes,
  sequelize,
} from '~/libs/packages/database/database.js';

class UserDetails extends BaseModel<UserDetails> {
  public firstName!: string;
  public lastName!: string;
  public userId!: number;
}

UserDetails.init(
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'user_details' },
);

export { UserDetails };
