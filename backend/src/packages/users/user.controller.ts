import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import type { ApiHandlerResponse } from '~/libs/packages/controller/libs/types/types.js';
import { HttpCode, HttpMethod } from '~/libs/packages/http/http.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';

import { User } from './user.model.js';
import { UserDetails } from './user-details.model.js';

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

    const user = await User.findOne({
      where: { email: 'tes10t@email.com' },
      include: UserDetails,
    });
    console.log('user', user);
    if (!user) {
      return {
        status: HttpCode.OK,
        payload: {},
      };
    }

    if (!user.details) {
      // UserDetails are null, create new details
      const userDetails = {
        // Set the user details here
        firstName: 'Admin',
        lastName: 'Adminich',
        userId: user.id,
      };

      // Create the user details
      const createdDetails = await UserDetails.create(userDetails, {
        include: User,
      });
      console.log('User details created:', createdDetails);
      return {
        status: HttpCode.OK,
        payload: { createdDetails },
      };
    } else {
      // UserDetails exist, update them as needed
      const updatedDetails = {
        // Set the updated user details here
        firstName: 'UpdatedName1',
      };

      // Update the user details
      const upd = await UserDetails.update(updatedDetails, {
        where: { userId: user.id },
        returning: true,
      });
      console.log('User details updated', upd);
      return {
        status: HttpCode.OK,
        payload: { upd, user },
      };
    }

    // const created = {};

    // const user = await User.create({
    //   email: 'tes10t@email.com',
    //    passwordHash: 'some hash',
    //    passwordSalt: 'some salt',
    // });

    // console.log('user', user);

    // return {
    //   status: HttpCode.OK,
    //   payload: { test },
    // };
  }
}

export { UserController };
