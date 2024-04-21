import { config } from '~/libs/packages/config/config.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { userService } from '~/packages/users/users.js';

import { sessionService } from '../session/session.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(
  userService,
  sessionService,
  encrypt,
  config,
);
const authController = new AuthController(logger, authService);

export { authController };
export { AuthApiPath } from './libs/enums/enums.js';
