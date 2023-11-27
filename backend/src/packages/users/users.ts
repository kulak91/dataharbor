import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';

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
export { userController };
