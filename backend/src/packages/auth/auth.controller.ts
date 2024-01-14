import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type {
  ApiHandlerOptions,
  ApiHandlerResponse,
} from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';
import type {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/packages/users/users.js';
import { userSignInValidationSchema } from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: LoggerService, authService: AuthService) {
    super(logger, ApiPath.AUTH);
    this.authService = authService;

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
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }

  private async signUp(
    options: ApiHandlerOptions<{ body: UserSignUpRequestDto }>,
  ): Promise<ApiHandlerResponse<UserSignUpResponseDto>> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  private async getAuthenticatedUser(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: options.user,
    };
  }
}

export { AuthController };
