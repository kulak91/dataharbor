
import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type {
  ApiHandlerOptions,
  ApiHandlerResponse,
} from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import type { ILogger } from '~/libs/packages/logger/logger.js';
import type { UserSignInRequestDto  } from '~/packages/users/users.js';
import { userSignInValidationSchema } from '~/packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  public constructor(logger: ILogger) {
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
            body: UserSignInRequestDto
          }>,
        );
      },
    });
  }

  private async signIn(
    options: ApiHandlerOptions<{ body: UserSignInRequestDto }>,
  ): Promise<ApiHandlerResponse<{ token: string }>> {
    console.log(options);
    return {
      status: HttpCode.OK,
      payload: { token: 'To-be-continued' },
    };
  }
}

export { AuthController };
