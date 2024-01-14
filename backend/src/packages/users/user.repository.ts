import type { DatabaseService } from '~/libs/packages/database/database.js';

import { UserEntity } from './user.entity.js';
import type { User as UserModel } from './user.model.js';
import { UserDetails } from './user-details.model.js';
import { type UserDetailsModel } from './users.js';

type Constructor = {
  userModel: typeof UserModel;
  userDetailsModel: typeof UserDetailsModel;
  db: DatabaseService;
};

class UserRepository {
  private userModel: typeof UserModel;

  private userDetailsModel: typeof UserDetailsModel;

  private db: DatabaseService;

  public constructor({ userModel, userDetailsModel, db }: Constructor) {
    this.userModel = userModel;
    this.userDetailsModel = userDetailsModel;
    this.db = db;
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({
      where: { id },
      include: UserDetails,
    });

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email: user.email,
      firstName: user.details?.firstName as string,
      lastName: user.details?.lastName as string,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({
      where: { email },
      include: UserDetails,
    });

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email: user.email,
      firstName: user.details?.firstName as string,
      lastName: user.details?.lastName as string,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });
  }

  public async create(payload: UserEntity): Promise<UserEntity> {
    const { email, firstName, lastName, passwordHash, passwordSalt } =
      payload.toNewObject();

    const { user, userDetails } = await this.db.client.transaction(
      async (transaction) => {
        const user = await this.userModel.create(
          { email, passwordHash, passwordSalt },
          { transaction },
        );
        const userDetails = await this.userDetailsModel.create(
          { userId: user.get('id'), firstName, lastName },
          { transaction },
        );

        return { user, userDetails };
      },
    );

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

export { UserRepository };
