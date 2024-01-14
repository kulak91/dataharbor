import type { User as UserModel } from './user.model.js';
import { UserDetails } from './user-details.model.js';

type Constructor = {
  userModel: typeof UserModel;
};

class UserRepository {
  private userModel: typeof UserModel;

  public constructor({ userModel }: Constructor) {
    this.userModel = userModel;
  }

  public async findById(id: number): Promise<UserModel | null> {
    const user = await this.userModel.findOne({
      where: { id },
      include: UserDetails,
    });

    if (!user) {
      return null;
    }

    console.log('User in user repository', user);

    return user;
  }
}

export { UserRepository };
