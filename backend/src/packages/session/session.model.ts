import {
  BaseModel,
  DataTypes,
  sequelize,
} from '~/libs/packages/database/database.js';

class Session extends BaseModel<Session> {
  public userId!: number;
  public token!: string;
  public ip: string | undefined;
}

Session.init(
  {
    token: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    ip: { type: DataTypes.STRING(60), allowNull: true },
  },
  { sequelize },
);

export { Session };
