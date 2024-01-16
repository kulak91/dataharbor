import { ExceptionMessage } from '~/libs/enums/enums.js';
import { AuthError } from '~/libs/exceptions/exceptions.js';
import type { ApiHandlerOptions } from '~/libs/packages/controller/controller.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { jwt } from '~/libs/packages/jwt/jwt.js';
import type {
  UserAuthResponseDto,
  UserService,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/packages/users/users.js';

import type { SessionService } from '../session/session.service.js';
import { getCookieValue } from './libs/helpers/helpers.js';

class AuthService {
  private userService: UserService;

  private encrypt: IEncrypt;

  private sessionService: SessionService;

  public constructor(
    userService: UserService,
    sessionService: SessionService,
    encrypt: IEncrypt,
  ) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.encrypt = encrypt;
  }

  public async signUp(
    payload: UserSignUpRequestDto,
    ip: string | undefined,
  ): Promise<UserSignUpResponseDto & { refreshToken: string }> {
    const userAlreadyExist = await this.userService.findByEmail(payload.email);
    if (userAlreadyExist) {
      throw new HttpError({
        message: ExceptionMessage.USER_ALREADY_EXISTS,
        status: HttpCode.FORBIDDEN,
      });
    }

    const user = await this.userService.create(payload);
    const token = await jwt.sign({ claim: { userId: user.id } });
    const refreshToken = await jwt.sign({
      claim: { userId: user.id },
      exp: '2h',
    });
    await this.sessionService.create({ ip, token, userId: user.id });

    return { user, token, refreshToken };
  }

  public signIn(
    payload: UserSignInRequestDto,
    ip: string | undefined,
  ): Promise<UserSignInResponseDto & { refreshToken: string }> {
    return this.verifyCredentials(payload, ip);
  }

  public async signOut({
    cookie,
    user,
  }: {
    cookie: string | undefined;
    user: UserAuthResponseDto | undefined;
  }): Promise<void> {
    if (!cookie || !user) {
      throw new AuthError({ message: ExceptionMessage.UNAUTHORIZED_USER });
    }
    const refreshToken = getCookieValue({ cookie, key: 'refresh-token' });

    if (!refreshToken) {
      throw new AuthError({ message: ExceptionMessage.UNAUTHORIZED_USER });
    }

    await this.sessionService.deleteByUserToken(user.id, refreshToken);
  }

  public async refreshToken(
    headers: ApiHandlerOptions['headers'],
    ip: string | undefined,
  ): Promise<UserSignInResponseDto & { refreshToken: string }> {
    const cookie = headers.cookie;
    const [, _token] = headers.authorization?.split(' ') ?? [];

    if (!cookie || !_token) {
      throw new AuthError({ message: ExceptionMessage.UNAUTHORIZED_USER });
    }

    const { userId } = jwt.decode<{ userId: number }>(_token);
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpError({
        message: ExceptionMessage.USER_NOT_FOUND,
        status: HttpCode.NOT_FOUND,
      });
    }

    await this.sessionService.deleteByUserToken(userId, _token);

    const token = await jwt.sign({ claim: { userId } });
    const refreshToken = await jwt.sign({ claim: { userId }, exp: '2h' });
    await this.sessionService.create({ ip, token, userId });

    return { user, token, refreshToken };
  }

  private async verifyCredentials(
    payload: UserSignInRequestDto,
    ip: string | undefined,
  ): Promise<UserSignInResponseDto & { refreshToken: string }> {
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
    const refreshToken = await jwt.sign({
      claim: { userId: user.id },
      exp: '2h',
    });
    await this.sessionService.create({ ip, token, userId: user.id });

    return { user, token, refreshToken };
  }
}

export { AuthService };
