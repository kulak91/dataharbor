import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type {
  ApiHandlerOptions,
  ApiHandlerResponse,
} from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import { jwt } from '~/libs/packages/jwt/jwt.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';
import type {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/packages/users/users.js';
import { userSignInValidationSchema } from '~/packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  public constructor(logger: LoggerService) {
    super(logger, ApiPath.AUTH);

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: HttpMethod.POST,
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) => {
        return this.signIn(
          options as ApiHandlerOptions<{
            body: UserSignInRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: HttpMethod.POST,
      handler: (options) => {
        return this.signUp(
          options as ApiHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: AuthApiPath.AUTHENTICATED_USER,
      method: HttpMethod.GET,
      handler: (options) => {
        return this.getAuthenticatedUser(options);
      },
    });
  }

  private async signIn(
    options: ApiHandlerOptions<{ body: UserSignInRequestDto }>,
  ): Promise<ApiHandlerResponse<UserSignInResponseDto>> {
    const token = await jwt.sign({ claim: { userId: 1 } });
    const mockResponse: UserSignUpResponseDto = {
      token: token ?? 'ew.. some error',
      user: {
        createdAt: new Date(),
        email: options.body.email,
        firstName: 'lol',
        lastName: 'kek',
        id: 1,
        updatedAt: new Date(),
      },
    };

    return {
      status: HttpCode.OK,
      payload: mockResponse,
    };
  }

  private async signUp(
    options: ApiHandlerOptions<{ body: UserSignUpRequestDto }>,
  ): Promise<ApiHandlerResponse<UserSignUpResponseDto>> {
    const mockResponse: UserSignUpResponseDto = {
      token: 'To-be-continued',
      user: {
        createdAt: new Date(),
        email: options.body.email,
        id: 1,
        updatedAt: new Date(),
        firstName: 'lol',
        lastName: 'kek',
      },
    };

    return {
      status: HttpCode.OK,
      payload: mockResponse,
    };
  }

  private async getAuthenticatedUser(
    _options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: _options.user,
    };
  }
}

export { AuthController };
