import {
  BaseModel,
  DataTypes,
  sequelize,
} from '~/libs/packages/database/database.js';

import { SessionModel } from '../session/session.js';
import { UserDetails } from './user-details.model.js';

class User extends BaseModel<User> {
  public email!: string;
  public passwordHash!: string;
  public passwordSalt!: string;
  public details?: UserDetails;
}

User.init(
  {
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING(60),
    passwordSalt: DataTypes.STRING(60),
  },
  { sequelize, tableName: 'users' },
);

User.hasOne(UserDetails, {
  foreignKey: 'userId',
  as: 'details',
  foreignKeyConstraints: true,
  hooks: true,
});

User.hasMany(SessionModel, {
  foreignKey: 'userId',
  as: 'session',
  foreignKeyConstraints: true,
  hooks: true,
});

SessionModel.belongsTo(User, {
  foreignKey: 'userId',
  as: 'session',
  hooks: true,
});

UserDetails.belongsTo(User, {
  foreignKey: 'userId',
  as: 'details',
  hooks: true,
});

export { User };
