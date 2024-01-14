import type { UserRepository } from './user.repository.js';
import type { UserAuthResponseDto } from './users.js';

type Constructor = {
  userRepository: UserRepository;
};

class UserService {
  private userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.userRepository = userRepository;
  }

  public async findById(id: number): Promise<UserAuthResponseDto | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    console.log('In user service user: ', user);

    return user as unknown as UserAuthResponseDto;
  }
}

export { UserService };
