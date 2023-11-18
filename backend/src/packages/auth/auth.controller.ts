import { userSignInValidationSchema } from 'shared/build/index.js';

import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type {
  ApiHandlerOptions,
  ApiHandlerResponse,
} from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import type { ILogger } from '~/libs/packages/logger/logger.js';

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
            body: { email: string; password: string };
          }>,
        );
      },
    });
  }

  private async signIn(
    options: ApiHandlerOptions<{ body: { email: string; password: string } }>,
  ): Promise<ApiHandlerResponse<{ token: string }>> {
    console.log(options);
    return {
      status: HttpCode.OK,
      payload: { token: 'hey you' },
    };
  }
}

export { AuthController };
