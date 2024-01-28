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
import { generateCookieValue } from './libs/helpers/helpers.js';

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
            client_ip: string;
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
            client_ip: string;
          }>,
        );
      },
    });

    this.addRoute({
      path: AuthApiPath.SIGN_OUT,
      method: HttpMethod.POST,
      handler: (options) => {
        return this.signOut(options as ApiHandlerOptions);
      },
    });

    this.addRoute({
      path: AuthApiPath.AUTHENTICATED_USER,
      method: HttpMethod.GET,
      handler: (options) => {
        return this.getAuthenticatedUser(options);
      },
    });

    this.addRoute({
      path: AuthApiPath.REFRESH_TOKEN,
      method: HttpMethod.POST,
      handler: (options) => {
        return this.refreshToken(options);
      },
    });
  }

  private async signIn(
    options: ApiHandlerOptions<{
      body: UserSignInRequestDto;
      client_ip: string;
    }>,
  ): Promise<ApiHandlerResponse<UserSignInResponseDto>> {
    const { refreshToken, ...payload } = await this.authService.signIn(
      options.body,
      options.client_ip,
    );

    return {
      status: HttpCode.OK,
      payload,
      cookie: generateCookieValue({
        name: 'refresh-token',
        value: refreshToken,
      }),
    };
  }

  private async signUp(
    options: ApiHandlerOptions<{
      body: UserSignUpRequestDto;
      client_ip: string;
    }>,
  ): Promise<ApiHandlerResponse<UserSignUpResponseDto>> {
    const { refreshToken, ...payload } = await this.authService.signUp(
      options.body,
      options.client_ip,
    );
    return {
      status: HttpCode.CREATED,
      payload,
      cookie: generateCookieValue({
        name: 'refresh-token',
        value: refreshToken,
      }),
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

  private async signOut({
    headers,
    user,
  }: ApiHandlerOptions): Promise<ApiHandlerResponse> {
    await this.authService.signOut({ cookie: headers.cookie, user });
    return {
      status: HttpCode.OK,
      payload: {},
    };
  }

  private async refreshToken(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse<UserSignInResponseDto>> {
    const { refreshToken, ...payload } = await this.authService.refreshToken(
      options.headers,
      options.client_ip,
    );
    return {
      status: HttpCode.OK,
      payload,
      cookie: generateCookieValue({
        name: 'refresh-token',
        value: refreshToken,
      }),
    };
  }
}

export { AuthController };
