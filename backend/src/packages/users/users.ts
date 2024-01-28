import { db } from '~/libs/packages/database/database.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { User as UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { UserDetails as UserDetailsModel } from './user-details.model.js';

const userRepository = new UserRepository({
  userModel: UserModel,
  userDetailsModel: UserDetailsModel,
  db,
});
const userService = new UserService({ userRepository, encrypt });
const userController = new UserController(logger);

export { UserColumnName } from './libs/enums/enums.js';
export {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export { userSignInValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { userController, UserDetailsModel, UserService, userService };
