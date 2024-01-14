import { ExceptionMessage } from '~/libs/enums/enums.js';
import { AuthError } from '~/libs/exceptions/exceptions.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { jwt } from '~/libs/packages/jwt/jwt.js';
import type {
  UserService,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/packages/users/users.js';

class AuthService {
  private userService: UserService;
  private encrypt: IEncrypt;

  public constructor(userService: UserService, encrypt: IEncrypt) {
    this.userService = userService;
    this.encrypt = encrypt;
  }

  public async signUp(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const userAlreadyExist = await this.userService.findByEmail(payload.email);
    if (userAlreadyExist) {
      throw new HttpError({
        message: ExceptionMessage.USER_ALREADY_EXISTS,
        status: HttpCode.FORBIDDEN,
      });
    }

    const user = await this.userService.create(payload);
    const token = await jwt.sign({ claim: { userId: user.id } });

    return { user, token };
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.verifyCredentials(payload);
  }

  private async verifyCredentials(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new HttpError({
        message: ExceptionMessage.USER_NOT_FOUND,
        status: HttpCode.NOT_FOUND,
      });
    }

    const secrets = await this.userService.findPrivateData(user.id);

    const isValidPassword = await this.encrypt.compare({
      passwordToCompare: payload.password,
      passwordHash: secrets.passwordHash,
      salt: secrets.passwordSalt,
    });

    if (!isValidPassword) {
      throw new AuthError({ message: ExceptionMessage.INCORRECT_CREDENTIALS });
    }

    const token = await jwt.sign({ claim: { userId: user.id } });

    return { user, token: token };
  }
}

export { AuthService };
