import { ExceptionMessage, HttpCode, HttpError } from 'shared/build/index.js';

import type { IEncrypt } from '~/libs/packages/encrypt/encrypt.js';

import { UserEntity } from './user.entity.js';
import type { UserRepository } from './user.repository.js';
import type { UserAuthResponseDto, UserSignUpRequestDto } from './users.js';

type Constructor = {
  userRepository: UserRepository;
  encrypt: IEncrypt;
};

class UserService {
  private userRepository: UserRepository;

  private encrypt: IEncrypt;

  public constructor({ userRepository, encrypt }: Constructor) {
    this.userRepository = userRepository;
    this.encrypt = encrypt;
  }

  public async findById(id: number): Promise<UserAuthResponseDto | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  public async findByEmail(email: string): Promise<UserAuthResponseDto | null> {
    const user = await this.userRepository.findByEmail(email);

    return user ? user.toObject() : null;
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserAuthResponseDto> {
    const { password, ...registerPayload } = payload;

    const passwordSalt = await this.encrypt.generateSalt(10);
    const passwordHash = await this.encrypt.encrypt(password, passwordSalt);

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        ...registerPayload,
        passwordHash,
        passwordSalt,
      }),
    );

    return user.toObject();
  }

  public async findPrivateData(
    id: number,
  ): Promise<{ passwordHash: string; passwordSalt: string }> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpError({
        message: ExceptionMessage.USER_NOT_FOUND,
        status: HttpCode.NOT_FOUND,
      });
    }

    return user.privateData;
  }
}

export { UserService };
