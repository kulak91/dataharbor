import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type {
  ApiHandlerOptions,
  ApiHandlerResponse,
} from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';
import type {
  UserAuthResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/packages/users/users.js';
import { UserModel } from './user.model.js';

class UserController extends Controller {
  public constructor(logger: LoggerService) {
    super(logger, ApiPath.USERS);

    this.addRoute({
      path: '/test',
      method: HttpMethod.GET,
      handler: (options) => {
        return this.testRequest(options);
      },
    });
  }

  private async testRequest(_options: unknown): Promise<ApiHandlerResponse> {
    // const mockUser: UserAuthResponseDto = {
    //   createdAt: new Date(),
    //   email: 'any-email@gmail.com',
    //   id: 1,
    //   updatedAt: new Date(),
    // };
    // const test = await UserModel.findAll();
    const test = await UserModel.findOne({
      where: { email: 'tes10t@email.com' },
    });
    console.log('test');

    const created = {};

    // const created = await UserModel.create({
    //   email: 'tes10t@email.com',
    //    passwordHash: 'some hash',
    //    passwordSalt: 'some salt',
    // });

    console.log('created', created);

    return {
      status: HttpCode.OK,
      payload: { test, created },
    };
  }
}

export { UserController };
